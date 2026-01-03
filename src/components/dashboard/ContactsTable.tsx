import { MoreHorizontal, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@acme.com',
    company: 'Acme Corp',
    status: 'Active',
    deal: '$45,000',
    lastContact: '2 hours ago'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@techstart.io',
    company: 'TechStart',
    status: 'Lead',
    deal: '$28,500',
    lastContact: '1 day ago'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@globalent.com',
    company: 'Global Enterprise',
    status: 'Active',
    deal: '$120,000',
    lastContact: '3 days ago'
  },
  {
    id: 4,
    name: 'Robert Wilson',
    email: 'r.wilson@innovate.co',
    company: 'Innovate Co',
    status: 'Prospect',
    deal: '$15,000',
    lastContact: '1 week ago'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa.a@futuretech.com',
    company: 'FutureTech',
    status: 'Active',
    deal: '$78,000',
    lastContact: '5 hours ago'
  }
];

const statusStyles = {
  Active: 'bg-success/10 text-success border-success/20',
  Lead: 'bg-info/10 text-info border-info/20',
  Prospect: 'bg-warning/10 text-warning border-warning/20'
};

export const ContactsTable = () => {
  return (
    <div 
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-tour="contacts-table"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-foreground">Recent Contacts</h3>
          <p className="text-sm text-muted-foreground">Your most recently active contacts</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Contact
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Company
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Deal Value
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Last Contact
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts.map((contact) => (
              <tr 
                key={contact.id}
                className="hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-foreground">{contact.company}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                    statusStyles[contact.status as keyof typeof statusStyles]
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-foreground">{contact.deal}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-muted-foreground text-sm">{contact.lastContact}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
