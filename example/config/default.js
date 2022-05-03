module.exports = {
  kaliber: {
    compileWithBabel: [
      /@kaliber\/pagination/,
      /@kaliber\/use-query-string/,
      /query-string/,
      /split-on-first/,
      /strict-uri-encode/,
    ],
    universal: {
      clientWrapper: '/wrappers/Client',
      serverWrapper: '/wrappers/Server',
    },
  }
}
