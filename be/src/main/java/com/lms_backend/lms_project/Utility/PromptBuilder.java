package com.lms_backend.lms_project.Utility;

public class PromptBuilder {

    public static String build(String essay) {
        return """
        You are a strict academic examiner.

        Grade the following essay using this rubric:
        - Content relevance (0-4)
        - Structure & coherence (0-2)
        - Grammar & vocabulary (0-2)
        - Argument clarity (0-2)

        RULES:
        - Return JSON ONLY
        - No explanation outside JSON
        - Use numbers only

        JSON FORMAT:
        {
          "content": number,
          "structure": number,
          "grammar": number,
          "argument": number,
          "total": number,
          "comment": "short feedback"
        }

        ESSAY:
        %s
        """.formatted(essay);
    }
}
