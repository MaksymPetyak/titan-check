from flask import Flask, request, jsonify
from flask_cors import CORS
from ..check_service import CheckService
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
check_service = CheckService()

@app.route('/api/check', methods=['POST'])
def check():
    try:
        logger.info("Received request to /api/check")
        data = request.get_json()
        logger.info(f"Request data: {data}")
        
        if not data or 'query' not in data:
            logger.error("No query provided in request")
            return jsonify({'error': 'No query provided'}), 400

        query = data['query']
        logger.info(f"Processing query: {query}")
        
        result = check_service.process_query(query)
        logger.info(f"Generated result: {result}")
        
        response_data = result.model_dump()
        logger.info(f"Sending response: {response_data}")
        return jsonify(response_data)
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@app.route('/api/healthcheck', methods=['GET'])
def healthcheck():
    return jsonify({'status': 'ok'})

# Handler for Vercel serverless function
def handler(request, context):
    return app(request) 