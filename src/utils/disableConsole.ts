export function disableConsoleLogs(): void {
    if (process.env.NODE_ENV === 'production') {
      //console.log = () => {};
    }
}
  