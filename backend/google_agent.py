from typing import List, Dict, Any
import os
from dotenv import load_dotenv
from haystack import Pipeline
from haystack.components.builders.prompt_builder import PromptBuilder
from haystack.components.fetchers import LinkContentFetcher
from haystack.components.converters import HTMLToDocument
from haystack.components.generators import OpenAIGenerator
from haystack.components.websearch import SerperDevWebSearch
from pydantic import BaseModel

load_dotenv()

class GoogleSearchResult(BaseModel):
    title: str
    link: str
    snippet: str

class GoogleSearchResponse(BaseModel):
    results: List[GoogleSearchResult]
    query: str
    summary: str | None = None

class GoogleSearchAgent:
    def __init__(self):
        # Initialize pipeline components
        self.web_search = SerperDevWebSearch(top_k=10)
        self.link_content = LinkContentFetcher()
        self.html_converter = HTMLToDocument()
        
        # Create summary template
        self.template = """Given the search results below about a person, provide a concise professional summary about them. 
        Focus on their background, experience, and any notable achievements or red flags if present.
        If the information seems irrelevant or about a different person, indicate that.
        Make the summary extremely concise and to the point, maximum of several paragraphs. 
        
        Search Results:
        {% for document in documents %}
            {{ document.content }}
        {% endfor %}
        
        Query: {{ query }}
        
        Summary:"""
        
        self.prompt_builder = PromptBuilder(template=self.template)
        self.llm = OpenAIGenerator(model="gpt-4")
        
        # Create pipeline
        self.pipe = Pipeline()
        self.pipe.add_component("search", self.web_search)
        self.pipe.add_component("fetcher", self.link_content)
        self.pipe.add_component("converter", self.html_converter)
        self.pipe.add_component("prompt_builder", self.prompt_builder)
        self.pipe.add_component("llm", self.llm)
        
        # Connect components
        self.pipe.connect("search.links", "fetcher.urls")
        self.pipe.connect("fetcher.streams", "converter.sources")
        self.pipe.connect("converter.documents", "prompt_builder.documents")
        self.pipe.connect("prompt_builder.prompt", "llm.prompt")

    def search(self, query: str, top_k: int = 10) -> GoogleSearchResponse:
        """
        Perform a web search using SerperDev API and summarize results using LLM
        
        Args:
            query: Search query string
            top_k: Number of results to return (default: 5)
            
        Returns:
            GoogleSearchResponse object containing search results and summary
        """
        # Run the pipeline
        response = self.pipe.run(
            data={
                "search": {"query": query},
                "prompt_builder": {"query": query}
            }
        )
        
        # Get search results
        search_response = self.web_search.run(query=query)
        documents = search_response["documents"][:top_k]
        
        results = []
        for doc in documents:
            result = GoogleSearchResult(
                title=doc.meta.get("title", ""),
                link=doc.meta.get("link", ""),
                snippet=doc.content
            )
            results.append(result)
        
        # Get the summary from LLM
        summary = response["llm"]["replies"][0] if response.get("llm", {}).get("replies") else None
            
        return GoogleSearchResponse(
            results=results,
            query=query,
            summary=summary
        )

if __name__ == "__main__":
    # Test the Google search functionality
    agent = GoogleSearchAgent()
    
    # Example query
    test_query = "Maksym Petyak software engineer"
    print(f"\nSearching for: {test_query}")
    
    try:
        result = agent.search(test_query)
        
        print("\nSearch Results:")
        for i, res in enumerate(result.results, 1):
            print(f"\n{i}. {res.title}")
            print(f"   Link: {res.link}")
            print(f"   Snippet: {res.snippet[:200]}...")
        
        print("\nSummary:")
        print(result.summary)
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")


