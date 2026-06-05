import json

from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def parse_resume_text(
    resume_text: str
):

    prompt = f"""
    Extract candidate information.

    Return JSON with:

    {{
        "name": "",
        "email": "",
        "phone": "",
        "skills": [],
        "experience": 0
    }}

    Resume:

    {resume_text}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={
            "type": "json_object"
        },
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    content = (
        response.choices[0]
        .message
        .content
    )

    print(content)

    return json.loads(content)




def score_candidate_fit(
    job_description: str,
    candidate_skills: str,
    candidate_experience: int
):

    prompt = f"""
        You are an expert technical recruiter.

        Analyze how well the candidate matches the job.

        Job Description:
        {job_description}

        Candidate Skills:
        {candidate_skills}

        Candidate Experience:
        {candidate_experience} years

        IMPORTANT:

        Return fit_score as an INTEGER BETWEEN 0 and 100.

        100 = perfect match
        80+ = strong match
        60+ = average match
        below 60 = weak match

        Return ONLY valid JSON.

        {{
            "fit_score": 0,
            "strengths": [],
            "missing_skills": [],
            "recommendation": ""
        }}
        """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={
            "type": "json_object"
        },
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return json.loads(
        response.choices[0].message.content
    )