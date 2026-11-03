# O.G. Products – Website

A simple, fast website for **O.G. Products** (clothing line: shirts, pants, sweatshirts + accessories).
Plain HTML/CSS/JavaScript. No build tools, no installs. Every Shop/Buy button sends customers to the
Shopify store: **https://11u81s-f0.myshopify.com**

## Files
| File | What it is |
|---|---|
| `index.html` | Home page |
| `shop.html` | Shop page (category cards that open the Shopify store) |
| `about.html` | Brand story |
| `contact.html` | Contact form (Formspree) |
| `404.html` | "Page not found" page |
| `config.js` | **All your settings – edit this one** |
| `main.js` | Site behavior (no need to edit) |
| `styles.css` | Colors and design |
| `favicon.svg` | Browser tab icon |
| `robots.txt`, `sitemap.xml` | For Google (put your domain in them) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## 1. Put it on GitHub Pages (free)
1. Go to github.com, click **+** (top right) > **New repository**. Name it e.g. `og-products`. Choose **Public**. Click **Create repository**.
2. On the new repo page click **uploading an existing file**. Drag in **everything inside** this folder
   (the `index.html` must be at the top level, not inside another folder). Click **Commit changes**.
3. In the repo, open **Settings** > **Pages** (left menu).
4. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)**. Click **Save**.
6. Wait 1–2 minutes and refresh. The link appears at the top of the Pages screen, like
   `https://YOUR-USERNAME.github.io/og-products/`.

To change something later: open the file on GitHub, click the pencil icon, edit, **Commit changes**. The site updates in a minute or two.

## 2. Edit your settings (`config.js`)
- `SHOPIFY_URL` – your store address. If you connect a custom domain in Shopify (e.g. `https://shop.yourdomain.com`), change it here and every link updates.
- `CART_PATH` – the cart page (`/cart`), used by the Cart button.
- `COLLECTIONS` – where each category button goes. All start as `/collections/all` (every Shopify store has it).
  When you make collections in Shopify (**Products > Collections**), copy the end of each collection's URL, e.g.
  `SHIRTS: "/collections/shirts"`, `PANTS: "/collections/pants"`, `SWEATSHIRTS: "/collections/sweatshirts"`,
  `ACCESSORIES: "/collections/accessories"`, `NEW_ARRIVALS: "/collections/new-arrivals"`.
- `CONTACT_EMAIL` – shows on the Contact page (blank = hidden).
- `FORM_ENDPOINT` – free form at https://formspree.io: sign up > **New form** > copy the URL like `https://formspree.io/f/abcdwxyz` and paste it here. Messages go to your email.
- `SOCIALS` – paste full links (e.g. `https://instagram.com/yourname`). Blank ones are hidden.

> Note: your Shopify store is currently password-protected ("Opening soon"). Visitors will see the password page
> until you open it: Shopify admin > **Online Store > Preferences > Password protection** > turn off (needs a paid plan).

## 3. Optional: Shopify Buy Button (add-to-cart right on the Shop page)
1. Shopify admin > **Sales channels** > add **Buy Button** > **Create a Buy Button** > pick a product or collection.
2. Customize, then click **Next** > **Copy code**.
3. Open `shop.html`, find `BUY BUTTON START`. Delete the line `<!-- BUY BUTTON START` and the line `BUY BUTTON END -->`.
4. Replace `PASTE YOUR SHOPIFY BUY BUTTON CODE HERE` with the code you copied. Commit.

## 4. Photos and logo
The grey boxes that say "Photo coming soon" are placeholders. To use real photos:
put your images in `images/` (e.g. `images/shirts.jpg`), then in the HTML replace the
`<div class="ph" ...>...</div>` block with `<img src="images/shirts.jpg" alt="O.G. shirts" loading="lazy">`.
Use JPG/WebP about 1200px wide to keep the site fast. The text logo "O.G.Products" can be swapped for
`<img src="images/logo.svg" alt="O.G. Products">` inside the `class="logo"` link.

## 5. Your own domain (optional)
Buy a domain, then in the repo **Settings > Pages > Custom domain**, enter it and follow GitHub's DNS steps.
Then replace `REPLACE-WITH-YOUR-DOMAIN.com` in `robots.txt`, `sitemap.xml`, and the `canonical` lines at the top of each page.

## Preview on your computer
Double-click `index.html`, or in this folder run `python3 -m http.server 8000` and open http://localhost:8000
