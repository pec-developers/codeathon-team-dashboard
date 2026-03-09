import { Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactView() {
  const technicalContacts = [
    { role: "Technical Lead", name: "Meganathan", phone: "+91 9342453053" },
    { role: "Technical Coordinator", name: "Anoob Krishna", phone: "+91 6381190918" },
    { role: "Technical Coordinator", name: "Diwakar Raj", phone: "+91 9551331855" },
    { role: "Technical Coordinator", name: "Gideon Jacob", phone: "+91 9003032644" },
  ];

  const generalContacts = [
    { role: "Help Desk", name: "Kamalnath", phone: "+91 8248384760" },
    { role: "Help Desk", name: "Keerthivasan", phone: "+91 8637667546" },
    { role: "Help Desk", name: "Preeth", phone: "+91 9840841183" },
    { role: "Help Desk", name: "Senthil Kumar", phone: "+91 7845570221" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
         <h2 className="text-3xl font-bold tracking-tight">Contact Support</h2>
         <p className="text-muted-foreground mt-2">Get in touch with the organizers for any queries or technical assistance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical POCs</CardTitle>
            <CardDescription>Contact for technical support or platform issues.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicalContacts.map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded border bg-muted/20">
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${c.phone.replace(/ /g, '')}`} className="hover:underline">{c.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>General Support</CardTitle>
            <CardDescription>Contact for general queries, help, and emergencies.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generalContacts.map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded border bg-muted/20">
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${c.phone.replace(/ /g, '')}`} className="hover:underline">{c.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
