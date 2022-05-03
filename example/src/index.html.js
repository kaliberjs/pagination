import App from '/App.universal'
import { QueryStringProvider } from '@kaliber/use-query-string'
import javascript from '@kaliber/build/lib/javascript'
import stylesheet from '@kaliber/build/lib/stylesheet'

export default function({ location }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>@kaliber/pagination</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {javascript}
        {stylesheet}
      </head>
      <body>
        <QueryStringProvider search={location.search}>
          <App {...{ location }} />
        </QueryStringProvider>
      </body>
    </html>
  )
}