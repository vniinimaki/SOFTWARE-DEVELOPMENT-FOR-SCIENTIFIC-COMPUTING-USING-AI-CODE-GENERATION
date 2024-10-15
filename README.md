# LEO Satellite simulation using LLM code generation

### How to run the simulation locally:

1. **Install Node.js**: Before you begin, make sure you have Node.js installed on your system. If not, you can download and install it from [the official Node.js website](https://nodejs.org/).

2. **Access the Application Code**:
    - If you have Git installed, you can clone the application repository by running the following command in your terminal:
        ```bash
        git clone https://gitlab.com/vniinimaki/llm-assisted-development-project.git
        ```
    - Alternatively, you can download the application code as a ZIP file from the GitLab repository page and unzip it.

3. **Navigate to the Project Directory**: Once you have the application code on your machine, navigate to the project directory using your terminal.

4. **Install Dependencies**: Before running the application, you need to install its dependencies. Run the following command in your terminal:
    ```bash
    npm install
    ```

5. **Start the Application**: After installing the dependencies, you can start the application by running the following command:
    ```bash
    npx vite
    ```

6. **Access the Application**: Once the application is running, you can access it in your web browser by typing the following address in the address bar:
    ```
    localhost:5173
    ```

If you find the project useful in your own project, please consider citing below:

Paavilainen, M., Ylihurula, A., Niinimäki, V., Kumar, A., Pirttikangas, S., & Tarkoma, S. (2024). Software Development for Scientific Computing Using AI Code Generation. Poster session presented at AI Day 2024 + Nordic AI Meet, Helsinki, Finland. https://researchportal.helsinki.fi/en/publications/software-development-for-scientific-computing-using-ai-code-gener 

or

@conference{a5e8c226b4ce4413b8aa968e79ecbdbc,
title = "Software Development for Scientific Computing Using AI Code Generation",
abstract = "Recent advancements in artificial intelligence (AI), particularly in generative AI and large language models (LLMs), have led to widespread adoption across various applications including code generation. Our paper examines the use of LLMs like GitHub Copilot for developing complex software systems (aka. domain-specific scientific computing software), specifically through a case study involving a satellite simulation application. The predominant focus of existing research on AI code generation centres around the evaluation of LLMs and the derivation of quantitative measures characterizing their code generation capabilities. However, S. Peng et al. [1] shifts attention to the practical implications of employing AI code generation in real-world contexts. They engaged 95 proficient programmers to develop an HTTP server using JavaScript, with 45 using Copilot. The assigned task was straightforward, typically requiring only a few hours to accomplish. The investigation primarily examines the immediate effects on productivity, employing task success and completion time as key performance indicators, rather than providing a comprehensive analysis of end-to-end software development processes in a domain-specific scientific computing context. Investigating the practical utilization of LLMs for code generation and systematically documenting the development process is crucial for understanding the distinct challenges posed by LLMs. This paper centers its inquiry on a fundamental question: Can professional-grade software tailored for the domain of scientific computing be effectively developed with the assistance of LLMs by smaller development teams within condensed timeframes, without domain expertise? To the best of our knowledge, this study represents the initial endeavor aimed at tackling the aforementioned objective. We used Copilot to generate the code for a low Earth orbit satellite constellation simulation. It is implemented using JavaScript, three.js [2] and satellite.js [3]. The resulting software can be used to simulate the orbits of the entire Starlink satellite constellation of over 5700 satellites and to find the shortest path between two ground stations via the satellite constellation. All the used prompts were collected and labeled based on their usefulness. The evaluation was conducted based on the average word count and label. In total, we used 760 prompts to Copilot and 38 hours and 25 minutes to develop the program, out of which 612 prompts and 32 hours were used on necessary features. We found that longer prompts result in more useful responses. Even though our application domain is quite niche, we were able to generate a working program with Copilot. We conclude that current LLMs are not dependable enough for end-users to generate complex software, especially in niche applications like we consider. Bugs introduced by Copilot required programming knowledge to be resolved. However, skilled software engineers can use LLMs to develop complex applications outside their field of expertise.",
author = "Matias Paavilainen and Aleksi Ylihurula and Verneri Niinim{\"a}ki and Abhishek Kumar and Susanna Pirttikangas and Sasu Tarkoma",
year = "2024",
month = oct,
language = "English",
note = "AI Day 2024 + Nordic AI Meet : AI Day ; Conference date: 21-10-2024 Through 22-10-2024",
url = "https://researchportal.helsinki.fi/en/publications/software-development-for-scientific-computing-using-ai-code-gener",
}
