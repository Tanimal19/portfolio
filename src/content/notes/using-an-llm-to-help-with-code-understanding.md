---
title: "Using an LLM to Help With Code Understanding"
year: 2024
link: "https://dl.acm.org/doi/10.1145/3597503.3639187"
date: "2026-08-25"
---

透過 in-IDE, prompt-less 工具協助使用者理解 code (snippet)  
使用者選取的程式當作 context，提供預設的四種功能：summary, api explain, domain explain, api usage example

- 任務推進更快，但並沒有讓使用者有更深的理解
- prompt 的撰寫影響 LLM 回答的價值，professional 的受益比 student 更明顯 (professional 較常使用自由提問)
- 工具主要減少的成本似乎是在 navigation 上，而不是加速理解
  - 而且使用者可能會有 comprehension outsourcing 的傾向
- prompt-less (general prompt) 還沒有辦法完全取代高品質的自由提問
- 未來可能的方向是引導使用者「如何問好問題」
