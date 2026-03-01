import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/utils"; // Assure-toi d'avoir une fonction formatPrice ou supprime le
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Vérification session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Récupération des données réelles (Comptabilité & Clients)
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  const { count: clientCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client');

  // 3. Calculs Comptables (KPIs)
  const totalRevenue = orders?.reduce((sum, order) => sum + (Number(order.amount) || 0), 0) || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-8">
      <div className="flex flex-col gap-8">
        
        {/* En-tête */}
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Dashboard Financier</h1>
            <span className="text-sm text-muted-foreground">Dernière maj: {new Date().toLocaleTimeString()}</span>
        </div>

        {/* Cartes KPI (Glassmorphism) */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <KpiCard title="Revenu Total" value={`${totalRevenue} MAD`} icon={CreditCard} trend="+20% ce mois" />
          <KpiCard title="Clients Actifs" value={clientCount?.toString() || "0"} icon={Users} trend="+2 new" />
          <KpiCard title="Commandes en cours" value={pendingOrders.toString()} icon={Activity} active />
          <KpiCard title="Livrées" value={completedOrders.toString()} icon={TrendingUp} />
        </div>

        {/* Tableau des Dernières Commandes */}
        <div className="glass-panel rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Transactions Récentes</h3>
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">ID Commande</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Statut</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Montant</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {orders?.map((order) => (
                            <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 font-mono text-xs">{order.id.slice(0,8)}...</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 font-bold">{order.amount} MAD</td>
                                <td className="p-4 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {orders?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-muted-foreground">Aucune commande pour le moment.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

// Petit composant UI pour les cartes
function KpiCard({ title, value, icon: Icon, trend, active }: any) {
  return (
    <Card className={`glass-panel border-0 ${active ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  )
}