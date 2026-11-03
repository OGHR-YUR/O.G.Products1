/* ============================================================
   O.G. Products – SITE SETTINGS
   This is the ONLY file you need to edit for links & contact info.
   After editing, save, commit to GitHub, and the site updates.
   ============================================================ */
window.OG_CONFIG = {
  BRAND_NAME: "O.G. Products",

  // Your Shopify store. Every "Shop" / "Buy" button points here.
  SHOPIFY_URL: "https://11u81s-f0.myshopify.com",

  // If you connect a custom domain to Shopify (e.g. https://shop.yourdomain.com),
  // just replace the address above. All links below update automatically.

  // Cart page on Shopify.
  CART_PATH: "/cart",

  // Shopify collection links (the part after the store address).
  // NOTE (Nov 2026): the store is still password-protected ("Opening soon"),
  // so no collection handles could be checked yet. "/collections/all" always
  // exists on Shopify, so it is the safe default.
  // Right now they all go to "all products". When you create collections
  // in Shopify (Products > Collections), put their handles here, e.g.
  //   SHIRTS: "/collections/shirts"
  // (Suggested handles: shirts, pants, sweatshirts, accessories, new-arrivals.
  //  The handle is the last part of the collection's URL in Shopify.)
  COLLECTIONS: {
    ALL:          "/collections/all",
    CLOTHING:     "/collections/all",
    SHIRTS:       "/collections/all",
    PANTS:        "/collections/all",
    SWEATSHIRTS:  "/collections/all",
    ACCESSORIES:  "/collections/all",
    NEW_ARRIVALS: "/collections/all"
  },

  // Contact email shown on the Contact page (leave "" to hide it).
  CONTACT_EMAIL: "",

  // Formspree form endpoint for the contact form.
  // Create a free form at https://formspree.io and paste its URL,
  // e.g. "https://formspree.io/f/abcdwxyz"
  FORM_ENDPOINT: "https://formspree.io/f/REPLACE-WITH-YOUR-FORM-ID",

  // ------------------------------------------------------------
  // BAGS – shown on bags.html. To add a bag, copy one { ... } line,
  // change the details, and save. Fields:
  //   name  – colorway shown on the card
  //   type  – bag type / model name
  //   price – number, in US dollars
  //   image – photo file in the site folder (e.g. "bag-9.jpg")
  //   link  – Shopify link for this product. Either a full URL
  //           ("https://11u81s-f0.myshopify.com/products/your-handle")
  //           or a path ("/products/your-handle"). Default: all products.
  // ------------------------------------------------------------
  BAGS_SECTION_TITLE: "Designer Style Bags",
  BAGS: [
    { name: "Pink Signature-Style Shoulder Bag", type: "Shoulder Bag", price: 180, image: "bag-1.jpg", link: "/collections/all" },
    { name: "Light Pink Signature-Style Shoulder Bag", type: "Shoulder Bag", price: 180, image: "bag-2.jpg", link: "/collections/all" },
    { name: "Cherry Print Shoulder Bag – Tan", type: "Shoulder Bag", price: 180, image: "bag-3.jpg", link: "/collections/all" },
    { name: "Cherry Print Shoulder Bag – Navy", type: "Shoulder Bag", price: 180, image: "bag-4.jpg", link: "/collections/all" },
    { name: "Black Signature-Style Shoulder Bag", type: "Shoulder Bag", price: 180, image: "bag-5.jpg", link: "/collections/all" },
    { name: "Brown Signature-Style Shoulder Bag – Black Trim", type: "Shoulder Bag", price: 180, image: "bag-6.jpg", link: "/collections/all" },
    { name: "Brown Signature-Style Shoulder Bag – Saddle Trim", type: "Shoulder Bag", price: 180, image: "bag-7.jpg", link: "/collections/all" },
    { name: "Cream Signature-Style Shoulder Bag – Taupe Trim", type: "Shoulder Bag", price: 180, image: "bag-8.jpg", link: "/collections/all" }
  ],

  // Social links. Leave "" to hide an icon.
  SOCIALS: {
    instagram: "",
    tiktok: "",
    facebook: "",
    x: "",
    youtube: ""
  }
};
