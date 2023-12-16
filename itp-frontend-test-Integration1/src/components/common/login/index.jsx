import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = ({
  title,
  subtitle,
  illustrationUrl,
  quoteText,
  quoteAuthor,
  children,
}) => {
  return (
    <div className="grid sm:grid-cols-1 xl:grid-cols-2 ">
      <div className="flex items-center px-5">
        <div className="my-28 px-5 w-full">
          <div className="block mb-12">
            <p className="text-5xl mb-4">{title}</p>
            <p className="text-xl">{subtitle}</p>
          </div>
          <div className="block">{children}</div>
        </div>
      </div>
      <div className="bg-[#F5F7F9] flex items-center justify-center min-h-screen">
        <div className="block">
          <img
            className="block mx-auto mb-4 max-w-lg"
            src={illustrationUrl}
            alt="Login illustration"
          />

          {quoteText && quoteAuthor && (
            <div className="block">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-left text-5xl mb-4"
              />
              <div className="text-center">
                <p className="text-xl mb-4">{quoteText}</p>
                <cite className="text-xl">-- {quoteAuthor}</cite>
              </div>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="block text-right text-5xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
