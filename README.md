# Verb Search / 动词查询系统

## English Version

### Project Description
Verb Search is a simple web-based tool for querying English verbs. It provides the verb's **base form, past tense, past participle**, and **Chinese translation**. Users can quickly search verbs and see the base form highlighted.

### Features
- Search English verbs with auto-match
- Display base form, past tense, past participle, and Chinese translation
- Highlight the base form if searched
- Lightweight HTML/CSS/JS project
- No backend required (CSV-based data storage)

### Usage

#### Option 1: Open directly in browser
1. Clone or download the repository:
```bash
git clone https://github.com/LovelyCat-exe/verb-dictionary.git
````

2. Open `index.html` in your browser
3. Start typing a verb in the search box
4. View the results in the table below

#### Option 2: Run a local HTTP server using Python

If you want to simulate a server environment (helpful for CSV loading in some browsers), you can run a local HTTP server:

1. **Install Python**

   * Download and install Python from [https://www.python.org/downloads/](https://www.python.org/downloads/)
   * Ensure `python` or `python3` is available in your terminal/command prompt:

     ```bash
     python --version
     # or
     python3 --version
     ```

2. **Navigate to project folder**

   ```bash
   cd path/to/verb-dictionary
   ```

3. **Start local server**

   * Python 3:

     ```bash
     python -m http.server 8000
     # or
     python3 -m http.server 8000
     ```
   * Python 2:

     ```bash
     python -m SimpleHTTPServer 8000
     ```

4. **Open in browser**
   Visit [http://localhost:8000](http://localhost:8000) and use the search functionality.

### Or you can directly visit my GitHub Pages URL:
   [https://LovelyCat-exe.github.io/verb-dictionary/](https://LovelyCat-exe.github.io/verb-dictionary/)


## 中文版

### 项目简介

动词查询系统是一个简单的网页工具，用于查询英语动词。它提供动词的 **原形、过去式、过去分词** 以及 **中文翻译**，用户可以快速查找动词，并高亮显示原形。

### 功能特点

* 支持英文动词搜索，自动匹配
* 显示原形、过去式、过去分词和中文翻译
* 搜索到原形时高亮显示
* 轻量化 HTML/CSS/JS 项目
* 基于 CSV 数据，无需后台

### 使用方法

#### 方法一：直接在浏览器中打开

1. 克隆或下载仓库：

   ```bash
   git clone https://github.com/LovelyCat-exe/verb-dictionary.git
   ```
2. 打开 `index.html`
3. 在搜索框输入动词
4. 查看下方表格中的查询结果

#### 方法二：使用 Python 本地运行服务器

1. **安装 Python**

   * Windows / Mac / Linux 用户：从 [https://www.python.org/downloads/](https://www.python.org/downloads/) 下载并安装
   * 确认终端或命令提示符中可以使用 `python` 或 `python3`：

     ```bash
     python --version
     # 或
     python3 --version
     ```

2. **进入项目文件夹**

   ```bash
   cd path/to/verb-dictionary
   ```

3. **启动本地服务器**

   * Python 3:

     ```bash
     python -m http.server 8000
     # 或
     python3 -m http.server 8000
     ```
   * Python 2:

     ```bash
     python -m SimpleHTTPServer 8000
     ```

4. **浏览器访问**
   打开 [http://localhost:8000](http://localhost:8000) 即可使用动词查询功能。

## 或者直接访问我的 GitHub Pages URL:
   [https://LovelyCat-exe.github.io/verb-dictionary/](https://LovelyCat-exe.github.io/verb-dictionary/)
