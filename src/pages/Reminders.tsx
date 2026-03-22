import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { listRemindersApi, updateReminderApi, type ReminderItem } from "@/lib/api";
import { BellRing, CalendarClock } from "lucide-react";

const Reminders = () => {
  const [items, setItems] = useState<ReminderItem[]>([]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const response = await listRemindersApi();
        setItems(response.reminders);
      } catch {
        setItems([]);
      }
    };

    void loadReminders();
  }, []);

  const toggleReminder = async (id: string) => {
    const target = items.find((item) => item.id === id);
    if (!target) {
      return;
    }

    const nextEnabled = !target.enabled;
    setItems((current) => current.map((item) => (item.id === id ? { ...item, enabled: nextEnabled } : item)));

    try {
      const response = await updateReminderApi(id, nextEnabled);
      setItems((current) => current.map((item) => (item.id === id ? response.reminder : item)));
    } catch {
      setItems((current) => current.map((item) => (item.id === id ? { ...item, enabled: target.enabled } : item)));
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Smart Reminders</h1>
            <p className="text-muted-foreground mb-8">Behavior nudges timed around prescription completion and household medicine cycles.</p>
          </ScrollReveal>

          <div className="space-y-4">
            {items.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div className="glass-card p-5 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <BellRing className="w-4 h-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1"><CalendarClock className="w-3 h-3" />{item.time} • {item.channel.toUpperCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      void toggleReminder(item.id);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${item.enabled ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {item.enabled ? "Enabled" : "Enable"}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reminders;
