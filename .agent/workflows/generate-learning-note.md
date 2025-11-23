---
description: Generate and save a learning note with dual organization (Chronological & Knowledge Base).
---

1.  **Analyze Context**: Review the recent conversation to extract the technical topic and explanation provided.
2.  **Get User Input**:
    - Ask the user for the **Topic Name** (e.g., "Server Actions").
    - Ask the user for the **Category** (Next.js, Auth, DB, General).
3.  **Generate Note Content**:
    - Create the content following the **6-step format** defined in `.agent/rules/learning.md`.
    - Ensure all explanations are in Japanese.
    - Include the header with the current date and reference links.
4.  **Save to Chronological**:
    - Get current date: `yyyy`, `mm`, `dd`.
    - Path: `learn_notes/chronological/{yyyy}/{mm}/{dd}/{topic-slug}.md`.
    - Create directory if it doesn't exist.
    - Save the file.
    - **Update Index**: Append a link to this note in `learn_notes/chronological/{yyyy}/{mm}/README.md`.
5.  **Save to Knowledge Base**:
    - **Search**: Look for existing files in `learn_notes/knowledge_base` that match the topic.
    - **Decision**:
        - **If found**: Read the existing file. Merge the new information into it, ensuring no duplicate sections but adding new insights. Update the file.
        - **If not found**: Create a new file at `learn_notes/knowledge_base/{Category}/{topic-slug}.md`.
6.  **Commit Changes**:
    - Run the following commands:
    ```powershell
    git add learn_notes/
    git commit -m "docs: add learning note for {Topic Name}"
    ```
