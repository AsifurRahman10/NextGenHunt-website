import { Title } from "../Share/Title";
import image from "../../assets/FAQ.svg";
export const FAQSection = () => {
  return (
    <div className="pt-10  w-11/12 md:w-9/12 mx-auto">
      <Title
        title={"Frequently Asked Questions (FAQ)"}
        para={
          "Have questions about NextGen Hunt? Find answers to the most common queries about product discovery, user roles, voting, moderation, and premium features. If you need further assistance, feel free to reach out to our support team!"
        }
        align={"center"}
        btn={"hidden"}
        section={"faq"}
      ></Title>
      <div className="flex items-center flex-col lg:flex-row gap-6">
        {/* question */}
        <div className="flex-1">
          <div className="collapse collapse-arrow border-b-2 rounded-none">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is NextGen Hunt?
            </div>
            <div className="collapse-content">
              <p>
                NextGen Hunt is a platform where users can discover and share
                the latest technology, including web apps, AI tools, software,
                games, and mobile apps.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Is NextGen Hunt free to use?
            </div>
            <div className="collapse-content">
              <p>
                Yes! Users can browse and explore products for free. However,
                certain premium features may require a subscription.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How do I submit a product to NextGen Hunt?
            </div>
            <div className="collapse-content">
              <p>
                Simply log in, go to your dashboard and add a product and it
                will be went to approved my admins and moderator.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How does the voting system work?
            </div>
            <div className="collapse-content">
              <p>
                Users can upvote products based on their quality and usefulness.
                Higher votes increase visibility.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border-b-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How do I report a product or review?
            </div>
            <div className="collapse-content">
              <p>
                Click the "Report" button on the product or review page and
                select a reason for reporting. Moderators will review the issue.
              </p>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="flex-1">
          <img src={image} className="w-full lg:w-10/12 mx-auto" alt="" />
        </div>
      </div>
    </div>
  );
};
