export const metadata = {
  title: "About - Get Me a Samosa",
}

const steps = [
  {
    img: "/group.gif",
    title: "Creators set up a page",
    text: "Log in with GitHub, pick a username and add your Razorpay keys. Your page goes live at /username.",
  },
  {
    img: "/coin.gif",
    title: "Fans buy a samosa",
    text: "Supporters pick an amount, leave an optional message and pay securely with Razorpay.",
  },
]

const benefits = [
  {
    title: "Benefits for creators",
    items: [
      "Payments go straight to your own Razorpay account",
      "A public page with a list of your top supporters",
      "Set up in a few minutes with your GitHub login",
    ],
  },
  {
    title: "Benefits for fans",
    items: [
      "Support a creator with any amount you like",
      "Leave a message along with your payment",
      "See your name on the creator's supporters list",
    ],
  },
]

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">About Get Me a Samosa</h1>
      <p className="mb-10 text-base sm:text-lg">
        Get Me a Samosa is a crowdfunding platform for creators. Your fans can support your work directly by buying you
        a samosa, so you can keep making things you care about.
      </p>

      <h2 className="mb-4 text-xl font-semibold sm:text-2xl">How it works</h2>
      <div className="mb-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
        {steps.map(({ img, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <img src={img} width={80} height={80} alt="" className="size-16 shrink-0 rounded-full sm:size-20" />
            <div>
              <h3 className="mb-1 text-lg font-semibold">{title}</h3>
              <p className="text-sm sm:text-base">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {benefits.map(({ title, items }) => (
        <section key={title} className="mb-8">
          <h2 className="mb-3 text-xl font-semibold sm:text-2xl">{title}</h2>
          <ul className="list-disc space-y-2 pl-6">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}