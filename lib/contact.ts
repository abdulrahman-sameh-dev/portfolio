export type ContactProtocol = {
  category: string;
  message: string;
};

export const REQUEST_PROTOCOL_EVENT = "request-protocol";

export type RequestProtocolDetail = ContactProtocol & { service: string };

export const serviceProtocolToContact: Record<string, ContactProtocol> = {
  architecture: {
    category: "Consultation",
    message:
      "I'd like to initiate an Architecture & System Design engagement. I'm looking for end-to-end architecture that starts with data contracts and ends with a clear deployment path, production-ready before a single UI pixel ships.",
  },
  build: {
    category: "Project",
    message:
      "I'd like to initiate a Full-Stack Product Build engagement. I'd like to take a project from greenfield to shipped, owning the full vertical slice — schema, API, interface, and deployment as one coherent system.",
  },
  audit: {
    category: "Consultation",
    message:
      "I'd like to initiate a Performance & Reliability Audit engagement. I'd like a forensic pass over latency, bundle weight, and failure modes, with a prioritized remediation plan I can act on.",
  },
};