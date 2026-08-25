---
title: "CodexGraph: Bridging Large Language Models and Code Repositories via Code Graph Databases"
year: 2024
link: "https://arxiv.org/abs/2408.03910"
date: "2026-08-20"
tags:
  - "LLM Coding"
---

1. 將 code repository 轉成 graph: `node` (MODULE, CLASS, FUNCTION) and `edge` (CONTAINS, INHERITS, USES)
2. user questions -> (main agent) -> nl queries -> (translation agent) -> graph queries

- 看起來需要較強模型 (GPT-4o) 才會有較好的效果 -> 工具可以給予增幅但不能提高上限?
- 將 write nl query 和 translation 的工作拆開可以提升表現 -> 分工減輕 reasoning load
- 感覺 [codegraph](https://github.com/colbymchenry/codegraph) 的想法應該有參考這個

