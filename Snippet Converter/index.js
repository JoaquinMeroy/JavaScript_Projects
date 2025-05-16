document.addEventListener("DOMContentLoaded", function () {
  const htmlInput = document.getElementById("htmlInput");
  const convertBtn = document.getElementById("convertBtn");
  const visualOutput = document.getElementById("visualOutput");
  const htmlOutput = document.getElementById("htmlOutput");
  const copyBtn = document.getElementById("copyBtn");

  // Initialize with the default example
  convertHtml();

  convertBtn.addEventListener("click", convertHtml);

  copyBtn.addEventListener("click", function () {
    const textToCopy = htmlOutput.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  function convertHtml() {
    const html = htmlInput.value.trim();
    if (!html) return;

    // Process the HTML string and add syntax highlighting spans
    const highlighted = highlightHtml(html);

    // Update visual output
    visualOutput.innerHTML = highlighted;

    // Update HTML output for copying
    htmlOutput.textContent = highlighted;
  }

  function highlightHtml(html) {
    // Start with original HTML string
    let result = html;

    // We'll build a new string with HTML entities and spans
    let highlighted = "";
    let inTag = false;
    let inAttrValue = false;
    let inRazorBlock = false;
    let inCodeBlock = false;
    let inComment = false;
    let quoteChar = "";
    let currentAttrName = "";
    let currentTagName = "";
    let tagContent = "";
    let razorBlockContent = "";

    // Process the input character by character
    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const nextChar = i < result.length - 1 ? result[i + 1] : "";
      const prevChar = i > 0 ? result[i - 1] : "";

      // Handle code blocks (```...```)
      if (
        i + 2 < result.length &&
        char === "`" &&
        result[i + 1] === "`" &&
        result[i + 2] === "`"
      ) {
        if (!inCodeBlock) {
          // Start of code block
          highlighted += '<span class="codeBlock">';
          inCodeBlock = true;
          // Skip the three backticks
          i += 2;
          continue;
        } else {
          // End of code block
          highlighted += "</span>";
          inCodeBlock = false;
          // Skip the three backticks
          i += 2;
          continue;
        }
      }

      // Handle comments in code (both Razor and code blocks)
      if (
        (inRazorBlock || inCodeBlock) &&
        i + 1 < result.length &&
        char === "/" &&
        nextChar === "/"
      ) {
        let commentContent = "//";
        let j = i + 2;

        // Collect the comment until the end of line
        while (j < result.length && result[j] !== "\n") {
          commentContent += result[j];
          j++;
        }

        highlighted +=
          '<span class="codeComment">' + commentContent + "</span>";
        i = j - 1; // Skip the comment
        continue;
      }

      // Handle HTML tags
      if (!inRazorBlock && !inCodeBlock && char === "<" && nextChar !== " ") {
        highlighted += '<span class="htmlTagDelimiter">&lt;</span>';
        inTag = true;
        tagContent = "";
        currentTagName = "";
        continue;
      }

      // Check for Razor components (tags starting with uppercase letters)
      if (
        !inRazorBlock &&
        !inCodeBlock &&
        !inTag &&
        char === "<" &&
        nextChar.match(/[A-Z]/)
      ) {
        highlighted += '<span class="htmlTagDelimiter">&lt;</span>';
        inTag = true;
        tagContent = "";
        currentTagName = "";
        continue;
      }

      // Check for Razor directive
      if (char === "@" && !inTag && !inCodeBlock) {
        // Handle @if, @code, etc.
        if (i + 2 < result.length) {
          // Check for @if
          if (result[i + 1] === "i" && result[i + 2] === "f") {
            highlighted += '<span class="atIf">&#64;if</span>';
            i += 2; // Skip 'if'
            inRazorBlock = true;
            razorBlockContent = "";
            continue;
          }
          // Check for @code
          else if (
            i + 4 < result.length &&
            result[i + 1] === "c" &&
            result[i + 2] === "o" &&
            result[i + 3] === "d" &&
            result[i + 4] === "e"
          ) {
            highlighted += '<span class="atCode">&#64;code</span>';
            i += 4; // Skip 'code'
            inRazorBlock = true;
            razorBlockContent = "";
            continue;
          }
          // Check for @bind and other attributes
          else if (
            i + 5 < result.length &&
            result.substr(i + 1, 4) === "bind"
          ) {
            let j = i + 1;
            let attrName = "";

            // Collect the full attribute name (@bind-...)
            while (j < result.length && /[a-zA-Z0-9_\-]/.test(result[j])) {
              attrName += result[j];
              j++;
            }

            highlighted +=
              '<span class="htmlAttributeName">&#64;' + attrName + "</span>";
            i = j - 1; // Skip the attribute name
            continue;
          }
        }

        // Handle normal @ symbol for variables
        highlighted += '<span class="razorVariable">&#64;';

        // Check if it's followed by a variable/property name
        let j = i + 1;
        let varName = "";
        while (j < result.length && /[a-zA-Z0-9_]/.test(result[j])) {
          varName += result[j];
          j++;
        }

        if (varName) {
          highlighted += varName + "</span>";
          i = j - 1; // Skip the variable name
        } else {
          highlighted += "</span>";
        }
        continue;
      }

      // Handle Razor block content
      if (inRazorBlock) {
        // Check for opening brace which starts the block content
        if (char === "{") {
          highlighted += '<span class="curlyBrace">{</span>';
          razorBlockContent += char;
          continue;
        }

        // Check for closing brace which may end the block
        if (char === "}") {
          highlighted += '<span class="curlyBrace">}</span>';
          razorBlockContent += char;

          // Check if this is the matching closing brace for the entire block
          const openBraces = (razorBlockContent.match(/{/g) || []).length;
          const closeBraces = (razorBlockContent.match(/}/g) || []).length + 1; // +1 for the current one

          if (openBraces === closeBraces) {
            inRazorBlock = false;
          }
          continue;
        }

        // Handle HTML tags inside Razor blocks
        if (!inTag && char === "<") {
          highlighted += '<span class="htmlTagDelimiter">&lt;</span>';
          inTag = true;
          tagContent = "";
          continue;
        }

        // Handle parentheses
        if (char === "(") {
          highlighted += '<span class="curlyBrace">(</span>';
          razorBlockContent += char;
          continue;
        }

        if (char === ")") {
          highlighted += '<span class="curlyBrace">)</span>';
          razorBlockContent += char;
          continue;
        }

        // Handle semicolons
        if (char === ";") {
          highlighted += '<span class="semicolon">;</span>';
          razorBlockContent += char;
          continue;
        }

        // Handle equals signs outside of HTML tags
        if (!inTag && char === "=") {
          highlighted += '<span class="htmlOperator">=</span>';
          razorBlockContent += char;
          continue;
        }

        // Process keywords in Razor code
        if (!inTag) {
          const keywords = [
            "if",
            "else",
            "foreach",
            "for",
            "while",
            "switch",
            "case",
            "default",
            "var",
            "private",
            "public",
            "protected",
            "class",
            "return",
            "true",
            "false",
            "void",
          ];
          const types = [
            "bool",
            "string",
            "int",
            "double",
            "float",
            "char",
            "byte",
            "object",
          ];

          let matched = false;

          // Check for keywords
          for (const keyword of keywords) {
            if (i + keyword.length <= result.length) {
              const possibleKeyword = result.substr(i, keyword.length);
              const beforeChar = i > 0 ? result[i - 1] : " ";
              const afterChar =
                i + keyword.length < result.length
                  ? result[i + keyword.length]
                  : " ";

              if (
                possibleKeyword === keyword &&
                /[\s{(]/.test(beforeChar) &&
                /[\s;,){}=]/.test(afterChar)
              ) {
                highlighted +=
                  '<span class="codeKeyword">' + keyword + "</span>";
                razorBlockContent += keyword;
                i += keyword.length - 1;
                matched = true;
                break;
              }
            }
          }

          if (matched) continue;

          // Check for types
          for (const type of types) {
            if (i + type.length <= result.length) {
              const possibleType = result.substr(i, type.length);
              const beforeChar = i > 0 ? result[i - 1] : " ";
              const afterChar =
                i + type.length < result.length ? result[i + type.length] : " ";

              if (
                possibleType === type &&
                /[\s{(]/.test(beforeChar) &&
                /[\s;,){}=]/.test(afterChar)
              ) {
                highlighted += '<span class="codeType">' + type + "</span>";
                razorBlockContent += type;
                i += type.length - 1;
                matched = true;
                break;
              }
            }
          }

          if (matched) continue;

          // Handle function calls and variables - improved logic
          if (/[a-zA-Z_]/.test(char)) {
            let name = char;
            let j = i + 1;

            // Collect the full name
            while (j < result.length && /[a-zA-Z0-9_]/.test(result[j])) {
              name += result[j];
              j++;
            }

            // Skip any whitespace
            while (j < result.length && /\s/.test(result[j])) {
              j++;
            }

            // Check if it's a function call (followed by opening parenthesis)
            if (j < result.length && result[j] === "(") {
              if (name.charAt(0).match(/[A-Z]/)) {
                highlighted += '<span class="functionCall">' + name + "</span>";
              } else {
                highlighted += '<span class="codeVariable">' + name + "</span>";
              }
              razorBlockContent += name;
              i = j - 1; // Move cursor to end of name
              continue;
            }
            // It's a variable or property
            else {
              highlighted += '<span class="codeVariable">' + name + "</span>";
              razorBlockContent += name;
              i = j - 1; // Move cursor to end of name
              continue;
            }
          }
        }

        // If we're inside a Razor block and inside a tag
        if (inTag) {
          if (char === ">") {
            // End of tag
            highlighted += '<span class="htmlTagDelimiter">&gt;</span>';
            inTag = false;
            continue;
          }

          // Process HTML tag content
          if (!inAttrValue && /[a-zA-Z0-9_\-\.]/.test(char)) {
            // Could be start of tag name or attribute name
            let word = char;
            let j = i + 1;

            // Collect the full word
            while (j < result.length && /[a-zA-Z0-9_\-\.]/.test(result[j])) {
              word += result[j];
              j++;
            }

            // Determine if it's a tag name or attribute name
            if (tagContent.trim() === "") {
              // It's a tag name
              currentTagName = word;
              highlighted +=
                '<span class="htmlElementName">' + word + "</span>";
            } else {
              // It's an attribute name
              currentAttrName = word;
              highlighted +=
                '<span class="htmlAttributeName">' + word + "</span>";
            }

            i = j - 1; // Move cursor to end of word
            tagContent += word;
            continue;
          }
        }

        // Any other character in Razor block
        highlighted += char;
        razorBlockContent += char;
      }
      // Handle code inside code blocks
      else if (inCodeBlock) {
        // Check for keywords in code blocks
        const keywords = [
          "if",
          "else",
          "foreach",
          "for",
          "while",
          "switch",
          "case",
          "default",
          "var",
          "private",
          "public",
          "protected",
          "class",
          "return",
          "true",
          "false",
          "void",
        ];
        const types = [
          "bool",
          "string",
          "int",
          "double",
          "float",
          "char",
          "byte",
          "object",
        ];

        let matched = false;

        // Check for keywords
        for (const keyword of keywords) {
          if (i + keyword.length <= result.length) {
            const possibleKeyword = result.substr(i, keyword.length);
            const beforeChar = i > 0 ? result[i - 1] : " ";
            const afterChar =
              i + keyword.length < result.length
                ? result[i + keyword.length]
                : " ";

            if (
              possibleKeyword === keyword &&
              /[\s{(]/.test(beforeChar) &&
              /[\s;,){}=]/.test(afterChar)
            ) {
              highlighted += '<span class="codeKeyword">' + keyword + "</span>";
              i += keyword.length - 1;
              matched = true;
              break;
            }
          }
        }

        if (matched) continue;

        // Check for types
        for (const type of types) {
          if (i + type.length <= result.length) {
            const possibleType = result.substr(i, type.length);
            const beforeChar = i > 0 ? result[i - 1] : " ";
            const afterChar =
              i + type.length < result.length ? result[i + type.length] : " ";

            if (
              possibleType === type &&
              /[\s{(]/.test(beforeChar) &&
              /[\s;,){}=]/.test(afterChar)
            ) {
              highlighted += '<span class="codeType">' + type + "</span>";
              i += type.length - 1;
              matched = true;
              break;
            }
          }
        }

        if (matched) continue;

        // Handle braces, parentheses, etc.
        if (char === "{") {
          highlighted += '<span class="curlyBrace">{</span>';
          continue;
        }

        if (char === "}") {
          highlighted += '<span class="curlyBrace">}</span>';
          continue;
        }

        if (char === "(") {
          highlighted += '<span class="parenthesis">(</span>';
          continue;
        }

        if (char === ")") {
          highlighted += '<span class="parenthesis">)</span>';
          continue;
        }

        if (char === "[") {
          highlighted += '<span class="squareBracket">[</span>';
          continue;
        }

        if (char === "]") {
          highlighted += '<span class="squareBracket">]</span>';
          continue;
        }

        if (char === ";") {
          highlighted += '<span class="semicolon">;</span>';
          continue;
        }

        // Handle string literals in code
        if (char === '"' && (i === 0 || result[i - 1] !== "\\")) {
          let stringContent = '"';
          let j = i + 1;

          while (
            j < result.length &&
            (result[j] !== '"' || result[j - 1] === "\\")
          ) {
            stringContent += result[j];
            j++;
          }

          if (j < result.length) {
            stringContent += '"';
            highlighted +=
              '<span class="codeString">' + stringContent + "</span>";
            i = j;
            continue;
          }
        }

        // Just a regular character in code block
        highlighted += char;
      }
      // Handle normal HTML
      else {
        // Handle @ symbol by converting to HTML entity
        if (char === "@") {
          highlighted += "&#64;";
          if (!inTag) tagContent += char;
          continue;
        }

        if (!inTag && char === "<") {
          // Start of a new tag
          highlighted += '<span class="htmlTagDelimiter">&lt;</span>';
          inTag = true;
          tagContent = "";
          currentTagName = "";
          continue;
        }

        if (inTag) {
          if (!inAttrValue && char === ">") {
            // End of tag
            highlighted += '<span class="htmlTagDelimiter">&gt;</span>';
            inTag = false;
            continue;
          }

          if (!inAttrValue && char === "/" && nextChar === ">") {
            // Self-closing tag ending
            highlighted += '<span class="htmlTagDelimiter">/&gt;</span>';
            inTag = false;
            i++; // Skip the next character (>)
            continue;
          }

          if (!inAttrValue && /[a-zA-Z0-9_\-\.]/.test(char)) {
            // Could be start of tag name or attribute name
            let word = char;
            let j = i + 1;

            // Collect the full word
            while (j < result.length && /[a-zA-Z0-9_\-\.]/.test(result[j])) {
              word += result[j];
              j++;
            }

            // Determine if it's a tag name or attribute name
            if (tagContent.trim() === "") {
              // It's a tag name
              currentTagName = word;
              highlighted +=
                '<span class="htmlElementName">' + word + "</span>";
            } else {
              // It's an attribute name
              currentAttrName = word;
              highlighted +=
                '<span class="htmlAttributeName">' + word + "</span>";
            }

            i = j - 1; // Move cursor to end of word
            tagContent += word;
            continue;
          }

          if (!inAttrValue && char === "=") {
            // Attribute equals sign
            highlighted += '<span class="htmlOperator">=</span>';
            tagContent += char;
            continue;
          }

          if (!inAttrValue && (char === '"' || char === "'")) {
            // Start of attribute value
            inAttrValue = true;
            quoteChar = char;
            highlighted +=
              '<span class="quot">' +
              (char === '"' ? "&quot;" : "&apos;") +
              "</span>";
            tagContent += char;
            continue;
          }

          if (inAttrValue && char === quoteChar) {
            // End of attribute value
            inAttrValue = false;
            highlighted +=
              '<span class="quot">' +
              (char === '"' ? "&quot;" : "&apos;") +
              "</span>";
            tagContent += char;
            continue;
          }

          if (inAttrValue) {
            // Inside attribute value
            highlighted +=
              '<span class="htmlAttributeValue">' +
              (char === "<" ? "&lt;" : char === ">" ? "&gt;" : char) +
              "</span>";
            tagContent += char;
            continue;
          }

          // Any other characters within tags (spaces, etc.)
          highlighted += char;
          tagContent += char;
        } else {
          // Text outside of tags
          highlighted += char === "<" ? "&lt;" : char === ">" ? "&gt;" : char;
        }
      }
    }

    return highlighted;
  }
});
