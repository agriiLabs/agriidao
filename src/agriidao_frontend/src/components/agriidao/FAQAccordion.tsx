import { useState } from "react";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); 

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: "What is agriiProtocol?",
        answer: "agriiProtocol is a decentralized data layer for Web3 agriculture, providing a tamper-proof, AI-ready infrastructure for agricultural data. It enables secure, verifiable, and transparent data access for farmers, co-ops, agri-tech startups, and financial institutions."
    },
    {
        question: "How does agriiProtocol ensure data integrity and ownership?",
        answer: "All agricultural data is stored on-chain, making it immutable and verifiable. Contributors maintain ownership of their data and earn incentives for sharing valuable information, ensuring a fair, decentralized model where those who provide value also benefit."
    },
    {
        question: "What are the key benefits of using agriiProtocol?",
        answer: "agriiProtocol provides benefits across the agricultural value chain. Farmers and co-ops get easier access to financing and fairer pricing. Agri-tech startups gain AI-ready datasets for automation and analytics. Supply chains and retailers can verify end-to-end traceability. Financial institutions benefit from secure on-chain records for risk assessment and smart contract-based lending."
    },
    {
        question: "How does agriiProtocol handle cross-chain interoperability?",
        answer: "agriiProtocol integrates with multiple blockchains through Chain Fusion, powered by ICP. This allows seamless data sharing across Web3 ecosystems, smart contract execution across multiple chains, and interoperability with Ethereum, Solana, Hedera, and more."
    },
    {
        question: "What role does agriiDAO play in agriiProtocol?",
        answer: "agriiProtocol operates as an independent decentralized infrastructure, but governance over its development and integrations happens through agriiDAO governance tokens. This ensures that users and stakeholders influence the evolution of the protocol, decisions are made transparently through on-chain governance, and the ecosystem remains aligned with the needs of agricultural stakeholders."
    },
    {
        question: "How are contributors incentivized?",
        answer: "Users who contribute valuable agricultural data earn incentives, giving them both ownership and rewards. Data providers retain ownership of their contributions, incentives are distributed based on participation and value creation, and farmers, co-ops, and agri-tech projects benefit directly instead of third parties monetizing their data."
    },
    {
        question: "How does agriiProtocol ensure security and data protection?",
        answer: "agriiProtocol is designed with security and data protection at its core. Tamper-proof smart contracts ensure data integrity. Decentralized storage prevents single points of failure. User-controlled access allows contributors to decide who can access their data."
    },
    {
        question: "Can agriiProtocol be used in real-world agricultural projects?",
        answer: "Yes. agriiProtocol is designed to solve real-world agricultural challenges. Co-ops can record harvest data for fair pricing. Supply chain operators can ensure farm-to-table traceability. DeFi solutions can use on-chain crop yields for financing. Governments and NGOs can monitor climate resilience programs."
    },
    {
        question: "What is the roadmap for agriiProtocol?",
        answer: "agriiProtocol is being built in phases, focusing on four key areas. Initial integration is bringing agricultural projects and institutions on board. Expansion of AI and data services will enhance automation and risk modeling. Interoperability upgrades will strengthen cross-chain compatibility through Chain Fusion. Scaling adoption will bring more co-ops, agri-tech startups, and supply chain operators into the ecosystem."
    },
    {
        question: "How can I start using agriiProtocol?",
        answer: "agriiProtocol is open to different stakeholders. Developers and agri-tech innovators can integrate with agriiProtocol’s API to access structured datasets. Farmers and co-ops can use smart contracts for finance, fair pricing, and traceability. Supply chain and financial institutions can leverage on-chain data for risk assessment, lending, and ESG reporting."
    }
];

const toggleAccordion = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
};

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-lg-9 col-md-12 col-sm-12">
        <div className="accordion" id="accordionExample">
          {faqItems.map((item, index) => (
            <div key={index} className="accordion-item rounded shadow mt-2">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button border-0 bg-light d-flex justify-content-between align-items-center ${
                    activeIndex === index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  style={{ display: "flex", width: "100%" }}
                >
                  <span>{item.question}</span>
                  <i
                    className={`mdi mdi-chevron-${activeIndex === index ? "up" : "down"} mdi-24px`}
                  ></i>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse border-0 collapse ${
                  activeIndex === index ? "show" : ""
                }`}
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
