# Course Configuration Guide

## Updating Course Information

To update the course information for a new term or different course, edit the configuration file at:

`src/lib/config/course.json`

### Configuration Fields

- **courseId**: The Quercus course ID (found in the URL when viewing your course on Quercus)
- **courseName**: Full name of the course
- **courseCode**: Course code (e.g., HISB05)
- **heroesTitle**: Title for the heroes roster page
- **heroesUrl**: URL path for the heroes page (usually "/")
- **term**: Current term (e.g., "Fall 2025")
- **instructor**: Instructor name
- **githubRepo**: GitHub repository URL for the "See Code" link

### Example Configuration

```json
{
  "courseId": "123456",
  "courseName": "History of Information Age",
  "courseCode": "HISB05",
  "heroesTitle": "Information Age Heroes",
  "heroesUrl": "/",
  "term": "Fall 2025",
  "instructor": "Matt Price",
  "githubRepo": "https://github.com/yourusername/hisb05-roster"
}
```

### Finding Your Quercus Course ID

1. Log into Quercus (https://q.utoronto.ca)
2. Navigate to your course
3. Look at the URL - it will be something like: `https://q.utoronto.ca/courses/123456`
4. The number at the end (123456 in this example) is your course ID

### Components Using This Configuration

- **Header.svelte**: Uses the config for navigation links
- **QuercusLink.svelte**: Component that generates Quercus course links
- **+page.svelte**: Uses config for page title and meta description

This centralized configuration makes it easy to update course information each term without having to modify multiple files.