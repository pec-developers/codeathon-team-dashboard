import { Mail, Phone, Globe, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactView() {
  const contacts = [
    { role: "Faculty Coordinator", name: "Dr. John Doe", phone: "+91 9876543210" },
    { role: "Event Manager", name: "Jane Smith", phone: "+91 8765432109" },
    { role: "Technical Lead", name: "Alice Johnson", phone: "+91 7654321098" },
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
            <CardTitle>Organizing Committee</CardTitle>
            <CardDescription>Reach out to specific personnel for urgent issues.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((c, i) => (
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
            <CardTitle>General Enquiries</CardTitle>
            <CardDescription>We're here to help.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border rounded bg-muted/50">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <a href="mailto:codeathon@prathyusha.edu.in" className="text-sm text-primary hover:underline">codeathon@prathyusha.edu.in</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 border rounded bg-muted/50">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Website</p>
                <a href="https://prathyusha.edu.in" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">prathyusha.edu.in</a>
              </div>
            </div>

            <div className="border-t pt-4 flex flex-col items-center text-center space-y-3">
              <p className="text-sm text-muted-foreground">Need immediate technical assistance?</p>
              <Button variant="white" className="w-full gap-2">
                <MessageSquare className="w-4 h-4"/> Chat with Volunteer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
