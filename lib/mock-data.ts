import type { Order } from "./types"

const FIRST_NAMES = [
  "Mohamed", "Yassine", "Karim", "Ahmed", "Omar",
  "Rachid", "Sofiane", "Bilal", "Hamza", "Ismail",
  "Nabil", "Tarik", "Farid", "Samir", "Anis",
]

const LAST_NAMES = [
  "Bouzidi", "El Amrani", "Khelifi", "Benali", "Messaoudi",
  "Cherif", "Boumediene", "Rahmani", "Hadj", "Ziani",
  "Mebarki", "Ait Ouali", "Djaballah", "Ferhat", "Slimani",
]

const STREETS = [
  "12 Rue des Lilas", "45 Avenue Jean Jaur\u00e8s", "8 Boulevard Victor Hugo",
  "23 Rue de la R\u00e9publique", "67 Rue Pasteur", "3 Rue de la Paix",
  "156 Avenue de Paris", "91 Rue Marcel Pagnol", "5 All\u00e9e des Cerisiers",
  "28 Rue Voltaire", "14 Place de la Mairie", "77 Rue des Roses",
]

const CITIES = [
  { city: "Paris", zip: "75020" },
  { city: "Marseille", zip: "13003" },
  { city: "Lyon", zip: "69007" },
  { city: "Saint-Denis", zip: "93200" },
  { city: "Aubervilliers", zip: "93300" },
  { city: "Montreuil", zip: "93100" },
  { city: "Clichy-sous-Bois", zip: "93390" },
  { city: "Sarcelles", zip: "95200" },
  { city: "Argenteuil", zip: "95100" },
  { city: "Bobigny", zip: "93000" },
]

const INSTRUCTIONS = [
  "Digicode 4523, 3\u00e8me \u00e9tage gauche",
  "Sonner chez Bouzidi",
  "Portail bleu au fond de la cour",
  "Code A1234, bât B",
  "Appeler en arrivant",
  "RDC porte droite",
  "Interphone ne marche pas, appeler",
  "Garage au sous-sol",
  "",
  "2\u00e8me \u00e9tage, porte 4",
]

export function generateMockOrders(count: number = 15): Order[] {
  const orders: Order[] = []

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const street = STREETS[Math.floor(Math.random() * STREETS.length)]
    const location = CITIES[Math.floor(Math.random() * CITIES.length)]
    const instructions = INSTRUCTIONS[Math.floor(Math.random() * INSTRUCTIONS.length)]
    const slot = Math.random() > 0.4 ? "J+1" : "J+2"
    const statuses: Array<"acompte_paye" | "en_livraison" | "livre_solde"> = [
      "acompte_paye", "acompte_paye", "acompte_paye",
      "en_livraison", "en_livraison",
      "livre_solde",
    ]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    orders.push({
      id: `MB-${String(1001 + i)}`,
      clientName: `${firstName} ${lastName}`,
      phone: `06${String(Math.floor(10000000 + Math.random() * 90000000))}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(" ", "")}@email.com`,
      address: street,
      city: location.city,
      zipCode: location.zip,
      instructions,
      deliverySlot: slot as "J+1" | "J+2",
      status,
      totalPrice: 300,
      deposit: 100,
      remaining: status === "livre_solde" ? 0 : 200,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3)).toISOString(),
    })
  }

  return orders
}
