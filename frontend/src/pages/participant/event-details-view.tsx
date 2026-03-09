import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function EventDetailsView() {
  const schedule = [
    { time: "09:00 AM", event: "Registration & Breakfast", day: "Day 1" },
    { time: "10:00 AM", event: "Inauguration & Problem Statement Release", day: "Day 1" },
    { time: "11:00 AM", event: "Hackathon Commences", day: "Day 1" },
    { time: "01:00 PM", event: "Lunch Break", day: "Day 1" },
    { time: "05:00 PM", event: "First Review", day: "Day 1" },
    { time: "08:00 PM", event: "Dinner", day: "Day 1" },
    { time: "11:00 PM", event: "Midnight Snacks & Fun Activity", day: "Day 1" },
    { time: "08:00 AM", event: "Breakfast", day: "Day 2" },
    { time: "10:00 AM", event: "Second Review", day: "Day 2" },
    { time: "01:00 PM", event: "Lunch", day: "Day 2" },
    { time: "03:00 PM", event: "Final Submission & Presentation", day: "Day 2" },
    { time: "05:00 PM", event: "Valedictory & Prize Distribution", day: "Day 2" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
         <h2 className="text-3xl font-bold tracking-tight">Event Details</h2>
         <p className="text-muted-foreground mt-2">Schedule, location, and key information for Codeathon 4.0</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5"/> Event Schedule
            </CardTitle>
            <CardDescription>
              A 36-hour hackathon to test your limits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {schedule.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border rounded-lg p-3 bg-card shadow-sm group-hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.day}</span>
                      <span className="text-xs font-medium text-primary flex items-center gap-1"><Clock className="w-3 h-3"/> {item.time}</span>
                    </div>
                    <p className="text-sm font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Main Campus Auditorium</p>
              <p className="text-sm text-muted-foreground mt-1">
                Prathyusha Engineering College<br/>
                Tamil Nadu, India
              </p>
              <div className="mt-4 aspect-video bg-muted rounded-md border flex items-center justify-center text-muted-foreground">
                 [ Map Placeholder ]
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>ID Card is mandatory at all times.</li>
                <li>Maintain discipline and decorum.</li>
                <li>Any form of plagiarism will lead to immediate disqualification.</li>
                <li>Keep your workspace clean.</li>
                <li>Reach out to volunteers for any assistance.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
