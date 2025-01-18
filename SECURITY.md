# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **Do not** create a public GitHub issue.
2. Email security@buckalew-financial.com with a detailed description of the vulnerability.
3. Include steps to reproduce, potential impact, and any suggested mitigation.

### What to Expect
- We aim to respond within 48 hours
- You'll receive an acknowledgment of your report
- We'll provide updates on the vulnerability status

### Responsible Disclosure Guidelines
- Give us reasonable time to address the issue before any public disclosure
- Avoid exploiting the vulnerability
- Do not use social engineering, denial of service, or other harmful techniques

## Known Security Measures
- Bcrypt password hashing
- HTTPS encryption
- Input validation
- Protection against common web vulnerabilities

## Technologies Securing the Application
- NextAuth.js for authentication
- Prisma ORM with parameterized queries
- Server-side rendering
- Strict CSP headers

_Last updated: January 2024_