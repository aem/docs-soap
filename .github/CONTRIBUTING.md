# Contributing to docs-soap
Thank you for helping out with docs-soap! I'm a college student with several jobs, so I have room to learn and improve, but that also means my availability to be constantly monitoring, testing, and developing this library on my own is fairly limited, but that'swhere you come in!

Use docs-soap in your own project, push it to its limits, open issues, and (if you're feeling brave) fork the repo and create a PR. **Please follow the issue and pull request templates provided.**

## Issues
Before creating an issue, **please search for your question** to see if the question has already been answered. If there is a closed issue similar to yours but you're not experiencing the exact same problem, create a new issue and tag the related issue rather than reopening the old issue.

When you create an issue, please tag it appropriately. That will help me stay organized, as well as allow me to prioritize, develop, and ship features or bug fixes as quickly as possible.

Please include a detailed description of the issue, steps to reproduce, actual vs. expected behavior, browser/node version, and any other relevant information with an issue.

## Pull Requests
Contributions are welcome, but **please do not commit straight to master** Instead, make your changes on a fork and submit a pull request.

Please make sure each PR has accompanying tests to verify functionality. Tests are found in the `test/` directory, are build using Mocha, and can be run using `npm run test`. Feel free to create new spec files to test functionality instead of just building off of the existing spec files, `npm run test` will run the whole directory. All tests must pass before I will merge in a pull request.

### Code Style
This repository follows the AirBnB style guide, with the exception of the `max-len` and `comma-dangle` rules. `npm run lint` must pass before any PRs will be accepted.

Happy cleaning :)
