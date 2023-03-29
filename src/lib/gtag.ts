/**
 * Example from Next.js
 * https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics
 */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

/**
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({
  action,
  category,
  label,
  value
}: {
  action: string
  category: string
  label: string
  value: string | number
}): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

/**
 * Usage Example
 * 
 * handleSubmit = (e) => {
    e.preventDefault()

    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: this.state.message,
    })

    this.setState({ message: '' })
  }
 */
