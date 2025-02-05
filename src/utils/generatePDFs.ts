import { renderToFile } from '@react-pdf/renderer';
import GuideTemplate from '../components/pdf-templates/GuideTemplate';

const guides = [
  {
    title: "Understanding Life Insurance",
    content: {
      sections: [
        {
          title: "Introduction",
          content: [
            "Life insurance is more than just a policy—it's a promise to protect your loved ones when you're no longer there to provide for them. Whether you're a parent, spouse, or caregiver, life insurance ensures that your family's financial needs are met, even in your absence.",
          ]
        },
        {
          title: "Why Is Life Insurance Important?",
          content: [
            "Life insurance provides financial security to your beneficiaries after your passing. Here's why it's crucial:",
          ],
          bullets: [
            "Income Replacement: Ensures your family can maintain their standard of living",
            "Debt Repayment: Helps cover mortgages, car loans, or credit card balances",
            "Education Funding: Can fund your children's education",
            "Funeral Costs: Alleviates the financial burden during difficult times"
          ]
        },
        // Add more sections based on your content
      ]
    }
  },
  // Add other guides
];

async function generatePDFs() {
  for (const guide of guides) {
    const filename = guide.title.toLowerCase().replace(/\s+/g, '-');
    await renderToFile(
      GuideTemplate({
        title: guide.title,
        content: guide.content
      }),
      `public/guides/${filename}.pdf`
    );
  }
}

export default generatePDFs;