---
title: "More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests"
year: 2026
link: "https://arxiv.org/abs/2601.21276"
date: "2026-08-27"
---

Evaluate code quality and reviewer reactions to PRs from both humans and LLM's generation.

- Max Redundancy Score: 計算新 function 和舊有 function 的最大語意相似度，可以捕捉邏輯相同但語法不同的 redundancy
- Reviewer Sentiment: 透過 reviewer 的 comment 來評估對 PR 的情緒反應 (憤怒、厭惡、恐懼、喜悅、悲傷、驚訝、中性)
- 結論：
  - LoC, Cyclomatic Complexity: AI ~ Humam
  - MRS: AI > Human
  - Sentiment: reviewer 普遍對 AI PR 反應中性和正面
    - **表示 reviewer 觀感好不代表 code quality 高**
    - LLM 經過 RLHF 訓練後，會更傾向生成「討喜」的輸出