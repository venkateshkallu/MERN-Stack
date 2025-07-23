# 🧠 Clean Code with SonarQube – Dashboard Overview for MERN Stack Project

SonarQube is a powerful tool for continuous inspection of code quality. I recently ran a successful analysis of my **MERN Stack project** and explored the SonarQube Community Edition (v25.7.0.110598). Here's a detailed breakdown of the results and what developers should know.

---

## 🚨 Warning: Embedded Database

SonarQube displays a warning:

> Embedded database should be used for evaluation purposes only.  
> It doesn't support scaling, upgrading SonarQube, or migrating to another DB engine.

🧪 For local testing or learning purposes, the H2 database is fine. But for production or team use, it's recommended to switch to **PostgreSQL** or another supported database engine.

---

## 📊 Issues Tab

The **Issues** tab provides a comprehensive overview of your code's health. Categories include:

- 🐛 **Bugs**
- 🔐 **Vulnerabilities**
- 🧹 **Code Smells**
- 🔁 **Duplications**
- 🔥 **Security Hotspots**

🔍 Filters let you slice by severity (Blocker, High, Medium, Low, Info), language, rules, or author.

🟢 **Result**:  
> ✅ No issues found. Hooray! 🎉

That means no bugs, no vulnerabilities, and no code smells were detected in the current scan.

---

## ⚙️ Quality Profiles

Each language in your codebase is analyzed using its own **Quality Profile**. These profiles are essentially collections of rules SonarQube uses during scanning.

### 🔤 Some Profiles Used:
| Language              | Rules Active | Profile Name |
|-----------------------|--------------|---------------|
| JavaScript            | 3,151        | Sonar way     |
| TypeScript            | 3,171        | Sonar way     |
| Python                | 286          | Sonar way     |
| HTML                  | 49           | Sonar way     |
| CSS                   | 24           | Sonar way     |
| Docker                | 40           | Sonar way     |

🛠 Note: A couple of profiles contain **deprecated rules**, which SonarQube flags:
- JavaScript – 1 deprecated rule
- TypeScript – 1 deprecated rule

---

## 🚦 Quality Gates

The **Sonar way** is the default **Quality Gate**, and it determines whether your code passes inspection. It evaluates:

### ✅ Conditions for New Code:
- 0 Issues (bugs, vulnerabilities, code smells)
- All security hotspots reviewed
- Coverage ≥ 80%
- Duplicated lines ≤ 3%

🟢 All new code in the scan passed these thresholds!

---

## 📌 What’s Next?

### ✅ Continue using SonarQube to:
- Enforce clean code during development
- Catch issues before code hits production
- Integrate scanning in CI/CD with GitHub Actions or Jenkins

### ⚠️ If scaling SonarQube:
- Switch from embedded H2 DB to **PostgreSQL**
- Consider **Developer Edition** or higher for PR analysis, branches, and advanced reporting

---

## 💬 Final Thoughts

Using SonarQube in your local dev workflow or CI/CD is a game changer for enforcing code quality standards. With the **Sonar way** profile and gate, you’re building a foundation of clean, testable, and secure code.

> "Clean Code is not just an ideal—it’s a practice. SonarQube makes it easier." 🚀

---

_📅 Scanned & documented: July 2025_

