import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function EventDetailsView() {
  const schedule = [
    { time: "07:30 AM", event: "Reporting & Venue Entry Starts", day: "Day 1" },
    { time: "08:00 AM", event: "Breakfast", day: "Day 1" },
    { time: "09:00 AM", event: "Reporting & Venue Entry Ends", day: "Day 1" },
    { time: "09:15 AM", event: "Inauguration Ceremony Starts", day: "Day 1" },
    { time: "10:15 AM", event: "Inauguration Ceremony Ends", day: "Day 1" },
    { time: "10:30 AM", event: "Problem Statement Reveal and Hack Begins", day: "Day 1" },
    { time: "01:00 PM", event: "Lunch", day: "Day 1" },
    { time: "02:00 PM", event: "Round 1 Evaluation", day: "Day 1" },
    { time: "07:00 PM", event: "Dinner", day: "Day 1" },
    { time: "08:00 PM", event: "Round 2 Evaluation", day: "Day 1" },
    { time: "07:00 AM", event: "Round 3: Final Evaluation", day: "Day 2" },
    { time: "07:30 AM", event: "Breakfast", day: "Day 2" },
    { time: "10:00 AM", event: "Valedictory & Prize Distribution Ceremony", day: "Day 2" },
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
              A 24-hour hackathon to test your limits.
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
              <p className="text-sm font-medium">CSE Mega Lab</p>
              <p className="text-sm text-muted-foreground mt-1">
                Prathyusha Engineering College, Tiruvallur 602025
              </p>
              <a 
                href="https://maps.app.goo.gl/rdJKtEYfXqxZG65g7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-4 aspect-video bg-muted rounded-md border flex items-center justify-center overflow-hidden relative cursor-pointer group hover:ring-2 hover:ring-primary/50 transition-all"
                title="Get Directions"
              >
                {/* Visual overlay for hover effect */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors z-10 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-background/90 text-foreground px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-opacity">
                    Get Directions
                  </span>
                </div>
                
                {/* pointer-events-none prevents the iframe from swallowing clicks, letting the <a> tag handle them */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.6749021204017!2d79.97291441033477!3d13.09111028875672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzI4LjAiTiA3OcKwNTgnMjIuNSJF!5e0!3m2!1sen!2sin!4v1714902148425!5m2!1sen!2sin&q=13.09111028875672,79.97291441033477" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  className="pointer-events-none"
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Map"
                ></iframe>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Rules & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>All code must be written from scratch during the hackathon; pre-built projects are strictly prohibited.</li>
                <li>Submissions must include a working demo, source code, and a brief presentation.</li>
                <li>Any form of plagiarism or copying from other teams will result in immediate disqualification.</li>
                <li>Please maintain professional discipline, proper decorum, and keep your workspace clean.</li>
                <li>Your college ID Card is mandatory and must be visible at all times.</li>
                <li>For any assistance or queries during the event, actively reach out to our volunteers.</li>
                <li>The decisions made by the judging panel are final and binding.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
