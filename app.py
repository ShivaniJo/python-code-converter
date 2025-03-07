from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access backend (CORS policy)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API Key setup
openai.api_key = "YOUR_OPENAI_API_KEY"  # Replace with your actual API key

# Define request body structure
class CodeRequest(BaseModel):
    input_code: str
    target_language: str

@app.post("/convert_code/")
async def convert_code(request: CodeRequest):
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Convert the following Python code to {request.target_language}:\n{request.input_code}",
            max_tokens=500
        )
        return {"converted_code": response['choices'][0]['text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Python Code Converter API is running!"}