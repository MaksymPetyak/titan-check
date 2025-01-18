from mistralai import Mistral
from settings import settings

def get_completion(prompt: str, is_json: bool = False) -> str:
    """
    Get a completion from Mistral API
    """
    client = Mistral(api_key=settings.MISTRAL_API_KEY)
    
    chat_response = client.chat.complete(
        model="mistral-large-latest",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ]
    )

    content = chat_response.choices[0].message.content
    if is_json:
        return normalize_json_output(content)
    else:
        return content

def normalize_json_output(json_output: str) -> str:
    return json_output.strip().replace("```json", "").replace("```", "")


if __name__ == "__main__":
    # Quick test
    test_prompt = "What is the best French cheese?"
    response = get_completion(test_prompt)
    print(f"Prompt: {test_prompt}")
    print(f"Response: {response}")
