---
title: "The Web Wasn't Built for This"
date: "2026-05-19"
description: "How the internet changes when there's a new visitor"
---

## How We Got Here

Since the conception of the web in 1989 as a simple information network, it has been built and consumed by humans with the goal of easy access. What this means for a modern day website is clean, simple, user interfaces following classical user experience rules which allow humans to more easily find information.

Of course, it hasn't always been this way, the methods of human interaction with the web have gone through many stages. From terminal-based interaction before mice, to simple web pages for early computers, then complex frameworks for rendering web apps, and more recently a mobile-first adoption in the mid 2010s. This shows how the architecture of web pages and platforms is moulded by the end-users and driven by demand.

Perhaps the biggest shift will come when the next cohort of internet users may not be human.

## The Rise of AI Agents

Although AI agents have been around for a long time, their availability to the public came alongside the rise of Large Language Models, meaning they had the capability to reason, act, use memory, and retrieve real-time data. These agents exist in many forms and are often specialised for a specific domain like finance or healthcare but they share a common dependency on the web. Pulling price data, filling out forms, and checking inventory all require them to interact with systems largely designed for humans. Although this kind of  autonomous agents make up roughly 2% of web traffic, it is the fastest growing sector and increasingly being led by individual desires. Sectors like retail, e-commerce and travel have seen a 587% increase in automated traffic. The explosive rise of personal AI assistants like [OpenClaw](https://openclaw.ai) or [Hermes Agent](https://hermes-agent.nousresearch.com) just show the demand for task-oriented agents. Of course, when you are an autonomous agent, the visual hierarchy or cognitive load of a website aren't relevant, you're far more concerned with speed and efficiency so suddenly, these existing interfaces are no longer suitable.

## Our Best Answers

The most comprehensive solution is [the Model Context Protocol](https://modelcontextprotocol.io/) (MCP) developed by *Anthropic*. This acts as an AI-native interface between traditional platforms and AI applications, allowing a universal form of communication. By leveraging this, businesses and platforms can expose themselves to more AI agent traffic.

<center><img src="/images/mcp.png" alt="Diagram Showing MCP Operation" width="800"/></center>

The drawback is that its very developer-facing, requiring significant overhead for a non-technical business to set up. For example, a museum or library may not have the resources to set this up, setting important services further behind in the modern world. Given a scenario where an agent is asked to book a museum ticket on a site without an MCP server, it initiates a process called 'Browser Automation' where it will attempt to interact with the site in the way a human would. This process is used by companies like [Browser Use](https://browser-use.com) and is built into many mainstream chatbots. Browser automation works but is vulnerable to complex changing interfaces, CAPTCHAs, or checkout flows.

A more lightweight solution proposed by Jeremy Howard is [*llms.txt*](https://llmstxt.org), a standardised file to be included in the source code of websites, acting as a guide for large language models interacting with the site. an example may look like this:

```
# Riverside Museum
> Local history museum in the centre of town.

## Visit
- [Opening hours](https://riverside-museum.example.com/hours)
- [Admission](https://riverside-museum.example.com/admission)
- [Getting here](https://riverside-museum.example.com/getting-here)

## Collections
- [Local history](https://riverside-museum.example.com/collections/local-history)
- [Fine art](https://riverside-museum.example.com/collections/fine-art)

## Exhibitions
- [Current exhibitions](https://riverside-museum.example.com/exhibitions)
```

This standard is much more accessible to less tech-facing businesses and offers more exposure to the world of agents with very little overhead. Most web pages already integrate similar technologies, using files like `robots.txt` or `sitemap.xml` which enable search engines to navigate and index the site. 

But a text file describing the structure and usage of the site has obvious limitations. Primarily, the file doesn't act as a proper interface, booking a ticket or submitting a form becomes difficult, and of course the file cannot support dynamic pricing or complex updating sites.

## The Two-Tier Web

The aforementioned solutions point to an undeniable fact that there is no magic bullet to allow AI agents to interact with our existing systems. Sophisticated platforms with enough engineering resources can build complex MCP servers, smaller businesses may implement a guide for agents, and everything else will be left to the best guesses from browser automation. Either way, the assumption that internet users are human, is largely outdated and our current systems may need a large overhaul. The lasting results of this could be a two-tier web, where AI can seamlessly interact with some sites but struggle with others in the same way mobile responsiveness divided the web a decade ago. The platforms and businesses which treat AI interaction as a first-class concern will likely have an advantage in a fast-paced world where agents operate all over the web.

> References & Further Reading:
_<small>https://ia.acs.org.au/article/2026/ai-internet-traffic-surges-as-agents-swarm-the-web.html</small>_
_<small>https://sqmagazine.co.uk/ai-agent-autonomy-statistics/</small>_



