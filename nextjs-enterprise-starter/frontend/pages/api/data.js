export default function handler(req, res){
  const { role='Employee' } = req.query
  // simple role-based sample payload
  const payload = {
    Admin: { message: 'Admin controls', budget: 100000 },
    HR: { message: 'HR dashboard', employees: 124 },
    Finance: { message: 'Finance overview', revenue: 12000 },
    Sales: { message: 'Sales pipeline', leads: 34 },
    Employee: { message: 'Personal dashboard', tasks: 7 }
  }[role] || { message: 'Unknown role' }

  // random points for chart
  const points = Array.from({length: 12}, () => Math.round(Math.random()*100))
  res.status(200).json({ payload, points })
}
