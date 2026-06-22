This Contract (this “Contract”), is entered into by and between: **OECD/ Pila Platform** (hereinafter referred to “Client”);

**\- and \-**

**Mak Khan of Alinon Technologies LLC**, with an address location in New York, USA (hereinafter referred to as “Agency”).

**WITNESSETH: That \-**

WHEREAS, the Client has a need for a comprehensive frontend modernization, security remediation, and architectural upgrade of its existing PILA website (the “Upgrade Project”); WHEREAS, the Agency has the skills and expressing interest in performing such services for Client; WHEREAS, the parties wish to set forth the terms and conditions upon which such services will be provided to Client; NOW THEREFORE, for and in consideration of the foregoing premises herein contained, the parties hereby agree as follows:

**Description of the Services:** Agency will perform a complete upgrade of the PILA website from its legacy Next.js 10 architecture to the modern, secure, and high-performance Next.js 16 ecosystem. This includes a critical migration of the Prismic CMS integration to the latest Slice Machine standard, ensuring long-term maintainability and security compliance. The key deliverables include:

*   **Core Framework Modernization:** Upgrade from Next.js 10 / React 17 to Next.js 16 / React 19, enabling the latest security patches and performance features.
*   **Prismic Architecture Migration:** Complete refactoring of the CMS layer from the deprecated `next-slicezone` library to the modern `@prismicio/next` and Slice Machine architecture.
*   **Component Library Update:** Upgrading UI dependencies including Styled Components and Framer Motion to their latest versions to ensure compatibility with modern React features.
*   **Type Safety & Compliance:** Enhancing TypeScript coverage (v5.9+) and implementing modern linting standards (ESLint Flat Config) to reduce future technical debt.
*   **Performance Optimization:** leveraging Next.js 16's optimized image and font handling.

**Project Schedule:** The Project will have a lifetime of approximately one (1) month (4 weeks). The project will be executed through a series of four (4) granular milestones, detailed below.

**Project Support:** Agency will offer a support period of 1 month after complete delivery of the project. During this period, the Agency will be responsible to fix any design, development or deployment related issues or bugs. This support period will not cover any additional development/ design changes or additions.

**Additional Development:** In case if Client wants to engage in further development of the project after delivery of the planned website, an hourly rate of $46 USD for development will be charged by the Agency. Client and Agency may enter another agreement for a scoped out piece of work with confirmed pricing.

**Infrastructure costs:** Agency will not be responsible for any costs associated with running Cloud infrastructure (such as Vercel, Prismic, or Google Cloud Platform) and Client shall support Agency in promptly setting up relevant Cloud provider accounts.

### **Milestones & Payment Schedule**

| Milestone | Description | Timeline | Proposed Payment (USD) |
| :--- | :--- | :--- | :--- |
| **1** | **Initialization & Core Framework Upgrade** | Week 1 | **$1,500** |
| **2** | **Prismic CMS Architecture Migration** | Week 2 | **$2,000** |
| **3** | **UI Stabilization & Component Updates** | Week 3 | **$1,000** |
| **4** | **Final QA, Testing & Deployment** | Week 4 | **$500** |
| | **Total** | **~4 Weeks** | **$5,000.00** |

### **Implementation details**

Here is a granular breakdown of the tasks within each milestone.

| Milestone | Key Objectives & Specific Tasks |
| :--- | :--- |
| **1. Initialization & Core Framework Upgrade** | **Objective:** Bring the foundation to 2026 standards (Next.js 16, React 19).<br>- **Repo Setup:** Initialize upgrade branch and clean legacy lockfiles.<br>- **Core Upgrade:** Update `package.json` to Next.js 16, React 19, TypeScript 5.9.<br>- **Config Migration:** Rewrite `next.config.js` to remove deprecated plugins (`next-compose-plugins`) and `tsconfig.json` to match strict mode requirements.<br>- **Linting:** Migrate to ESLint 10 (Flat Config) and fix immediate build-blocking type errors. |
| **2. Prismic CMS Architecture Migration** | **Objective:** Replace the deprecated data layer with the modern Slice Machine.<br>- **Library Swap:** Uninstall `next-slicezone`; Install `@prismicio/next` & `@prismicio/client`.<br>- **Config Update:** Convert `sm.json` to `slicemachine.config.json`.<br>- **Client Refactor:** Rewrite `prismic.tsx` to use the new `createClient` pattern.<br>- **Slice Migration:** Refactor all ~18 Slices in the `slices/` directory to use new `SliceComponentProps` and TypeScript interfaces.<br>- **Page Integration:** Update `[theme]/index.tsx`, `[detail].tsx`, and other page routes to use the new data fetching methods. |
| **3. UI Stabilization & Component Updates** | **Objective:** Ensure visual fidelity and interactivity after major upgrades.<br>- **Styled Components:** Upgrade to v6 and implement the Next.js Registry to ensure correct server-side rendering of styles.<br>- **Framer Motion:** Upgrade to v12 and fix breaking changes in animation props (e.g., `AnimateSharedLayout` deprecations).<br>- **Image & Link:** Audit and fix all usages of `next/image` and `next/link` to match the new API signatures.<br>- **Forms:** Verify Firebase and SendGrid integrations remain functional with React 19. |
| **4. Final QA, Testing & Deployment** | **Objective:** Production readiness and handoff.<br>- **Type Safety:** Resolve remaining TypeScript errors resulting from strict mode.<br>- **Visual QA:** Manual verification of all page types (Home, Guides, Learning Modules) against the live site.<br>- **Preview Mode:** Verify that Prismic Previews work correctly with the new setup.<br>- **Launch:** Assist with deployment to Vercel/Production environment and verify post-launch health. |

### **I. INTELLECTUAL PROPERTY RIGHTS**

**Pre‐Existing Intellectual Property.** Unless for the Client's benefit, the Agency will not use any third party, or any pre-existing intellectual property in connection with this Contract. Should the Agency use such pre-existing intellectual property, the Agency will be obliged to obtain from the third-party owner the right to use such intellectual property and in no way shall the Client be burdened of any inconvenience caused by the Agency in the engagement to this Contract.

All works and intellectual property as to the product result of the service provided by the Agency to the Client shall be owned by the Client, including 3rd party Pre-Existing Intellectual Property if there is any, as it being incorporated to the deliverables by the Agency to the Client, with the license including the right to sell, use, reproduce, modify, adapt, display, distribute, disclose, and to sublicense, among others.

**Retention of Rights.** The Agency will retain code assets for further development projects with the Client. The Agency will ensure the proper safety of the code assets and will not disclose them to any third-party.

**Intellectual Property of Client.** Agency not have any right or interest in any of the Client's Intellectual property, except for the limited use which is for the benefit of the Client.

### **II. CONFIDENTIALITY**

**Confidential Information.** For the purpose of this Agreement, Confidential Information shall mean proprietary information or any information in consonance to the proprietary rights of a Party. This may also mean an information distinctively declared as confidential by the Disclosing Party. This information may be acquired by the Receiving Party through knowledge or grant of access by the Disclosing Party. The information herein includes but not limited to, those conceived or discovered or developed in whole or in part by Agency hereunder.

**Client Confidential Information.** The concepts, deliverables, discoveries, ideas, tools in various states of development provided by the Client, and likewise designs, drafts, specifications, techniques, methods, processes, procedures, contacts, associations, references, other information related to customers, product prices, offers, policies and financial information, this Contract and the existence of this Contract, and any work assignments authorized or issued under this Contract.

Agency will not use Client’s name, likeness, logo or any form of identity that may represent the Client without Client’s prior written consent, to include use or reference to Client’s Identity in any way and in conjunction with the customers of the Client, its potential clients, list of clients and customers, the news releases or releases to any professional or trade publications.

All confidential information shall not be disclosed by the Agency to third parties and shall continue to be in force even at the termination of this Contract.

**Non-Disclosure.** Except as permitted in writing and signed by the Client, the Parties hereby agree that during the term of this Agreement and thereafter, the Agency may not use for commercialization, disclose to any person the Confidential Information by the Client.

Agency hereby represents that the execution of this Contract, does not in any way produce conflict or breach to any contractual or fiduciary obligation to which Agency is bound. Agency shall not accept work from a competitor or any other business organization any work or any other that may create an actual or potential conflict of interest for the Agency or which may become detrimental to Client’s business interests.

The Agency may not solicit, enter into new agreements or arrangements, or any activity with another clients being under the same industry for a period of 5 years, upon conclusion or termination of this agreement.

### **III. TERMINATION**

**Right to Terminate by Client**. Client may terminate this Contract and/or an individual, or any open project without liability at any time, upon prior written notice to the Agency.

Upon termination, the Agency will provide the Client a report of the status of any project, in progress or completed, by the Agency. Client shall not withhold any payment to Agency the equitable amount for the partially completed work in progress and the agreed to price for the completed Services and/or Deliverables provided and accepted before the end of the Agreement. Agency shall return all Confidential Information, including all notes, records or any file to the Client which in any way may incorporate Confidential Information provided by Client to Agency.

### **IV. WARRANTIES**

Agency warrants that all Services and Deliverables by the Agency are free from any defect and are conforming to the specifications required by the Client. Likewise, the Agency warrants that the work made by the latter is original and does not infringe any trademark, service mark, trade name, secrets, proprietary or copyright of any third party.

### **V. LIMITATION OF LIABILITY**

No party shall be liable for any damages, loss of data, profits or revenue, cost of capital or downtime costs in any way connected with the subject matter of the agreement.

### **VI. INSPECTION AND ACCEPTANCE**

Client shall inspect any of the services performed or deliverables performed by the Agency before acceptance. Should the services performed be found to be unsatisfactory, Client may require Agency to redo, replace, or repair the work done in order to bring such to full compliance with the requirements, at cost of Agency.

### **VII. MISCELLANEOUS**

**Counterparts**
This Contract may be executed in two or more counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same Contract.

**Agreement Modification**
No modification or alteration of this Contract shall be considered as having been made unless executed in writing and duly signed by the parties hereto.

**Assignment**
Neither party shall assign or transfer its right and obligations under this contract without the prior written consent of the other.

**Separability Clause**
Should any of the provisions of this Contract be held invalid by any competent court, the same shall apply only to the said provision involved and the remaining provisions hereof shall remain valid and enforceable.

**No Employer-Employee Relationship**
The Parties to this Agreement, in entering this Contract, does not in any way, create an employer-employee relationship. The Client and Agency agree that upon execution of this Agreement the Agency, during this Contract shall remain an independent contractor and not bound by the Client's employment rules and regulations.

**Judicial Action**
Any action arising from or in connection with this Contract shall be filed with the proper courts of Wyoming, USA, to the exclusion of all other venues that are hereby expressly and willingly waived by the parties.

**Force Majeure**
No Party shall be held liable for any failure in performance under this Contract when failure is caused beyond that Party’s reasonable control, including, but not limited to, acts of terrorism, war, earthquake, fire, storm, flood, accident, and prolonged shortage of energy. In the event of such delay, the scheduled date for delivery shall be adjusted reasonably to the benefit of the Agency. If the delay remains in effect for a period in excess of thirty days, Client may terminate this Contract upon written notice to the Agency.

**Entire Contract**
This Agreement, including the documents attached herein shall constitute the one and the same agreement between the Parties. This Agreement supplants any other previous oral or written commitments, agreements or understanding. Further, this Contract may not be modified, changed, or otherwise altered in any respect except by a written agreement and consent signed by both Parties.

IN WITNESS WHEREOF, the parties hereto have affixed their signatures this \_\_\_\_\_ day of \_\_\_\_\_\_\_\_, 2026.

**Client’s Name:** OECD

**Client’s Signature:**

**Agency’s Name:** Alinon Technologies, LLC

**Agency’s Signature:**
