# Valorant Skin Currency Bundle Calculator

## Table of Contents
- [Preview](#preview)
- [Description](#description)
- [Key Features](#key-features)
- [Technical Breakdown](#technical-breakdown)
- [Motivation](#motivation)
- [Installation and Usage](#installation-and-usage)
- [Acknowledgments](#acknowledgments)

## Preview

![screencapture-localhost-5173-2025-01-08-15_34_08](https://github.com/user-attachments/assets/4221a828-fd38-4543-ae65-2a9e4026afd6)

## Description

This project was born out of a personal need to make navigating Valorant’s vast catalog of skins more convenient. The app lets users browse through all available weapon skins and pick their favorites, then calculates the most cost-effective combination of VP (Valorant Points) bundles to purchase. It's designed to save players both time and money, providing a simple solution to a common gaming pain point.

## Key Features

Complete Skin Catalog: The app pulls detailed information on all weapon skins directly from the Valorant wiki, ensuring players have access to the full collection. (BeautifulSoup webscraper)
Easy Selection: Users can visually browse and select skins they’re interested in purchasing, with the app keeping track of their total VP cost.
Smart Currency Suggestions: The app analyzes the user’s selections and recommends the best VP bundles to purchase, helping them get the most value with minimal over-spending.

## Technical Breakdown

Developed using `React`, leveraging `JavaScript`, `CSS`, and `HTML` to create a smooth, responsive, and user-friendly interface.
Built a Python script to scrape data from the Valorant wiki due to the lack of an official API. This script ensures the app stays up-to-date with the latest skin releases.

## Motivation

As a Valorant player myself, I often found it frustrating to manually calculate VP costs and figure out which bundles to buy without overspending. This project gave me a chance to solve that problem while honing my skills in web development and data scraping. It’s a personal, functional tool that I think reflects my passion for both gaming and creating user-centric applications.

## Installation and Usage

### Prerequisites

* `Node.js` installed for running the app.
* `Python` installed for running the web scraper script.
Steps to Run the Project
1. Clone the repository to your local machine.
2. Install dependencies - `npm install`
3. Start the development server - `npm run dev`
4. Access the app in your browser at the local development URL provided.

### Running the Web Scraper

1. Navigate to the `scripts` directory.
2. Run the Python web scraper script - `python extract_table_data.py`
3. The script will fetch the latest skin data and update the app.

## Acknowledgments

Thanks to the **Valorant wiki** for providing detailed skin information.
The **BeautifulSoup** library for enabling seamless web scraping.
Feel free to share feedback, suggestions, or issues to help improve the project!
