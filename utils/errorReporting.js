function reportErrorToExternalService(error, errorInfo) {

    // Make your calls to external services
    console.log(`error: ${error} errorInfo: ${errorInfo} - REPORTED to external`);
}

export { reportErrorToExternalService };