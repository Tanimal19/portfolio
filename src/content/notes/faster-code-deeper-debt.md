---
title: "Faster Code, Deeper Debt? A Multivocal Literature Review on Technical Debt and Its Early Signs in LLM-Assisted Software Development"
year: 2026
link: "https://arxiv.org/abs/2606.14796"
date: "2026-08-27"
---

Review paper. Focus on technical debt in LLM-assisted software development.

- LLM 帶來什麼技術債？
  - code debt, design debt, documentation debt 最常見
  - fast-integration debt: 快速生成會讓長期維護成本增加
  - 新的類型: prompt debt (prompt 的微小改動可以產生不同實作、系統行為難以重現), ethical debt (AI 生成內容可能有偏見、隱私疑慮), data debt (輸入資料的品質也會累積債務), provenance debt (作者歸屬和來源不可追溯，增加維護成本，因為根本不知道債從哪裡來)
- 現在有什麼緩解策略？ human-in-the-loop, prompt engineering, datac quality alignment
- 有哪些偵測工具？ SonarQube, CodeSmellEval
- 有哪些 benchmark / dataset？ 沒有
- 既有 metric 是否能夠 capture 所有技術債類型？
  - 現有工具可以抓出語法錯誤和部分可維護性問題，但無法捕捉 semantic accuracy, architectural fit, adaptability
  - 簡單來說需要從 static 轉向 dynamic, context-aware and across-time 的指標