import { Heart } from "lucide-react";

export const ThankYouSection = () => {
  return (
    <div className="mt-6" dir="rtl">
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🤍</span>
          <h3 className="font-serif text-xl font-semibold text-accent">
            تحية شكر وتقدير
          </h3>
          <span className="text-2xl">🤍</span>
        </div>
        
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            تحية طيبة، وأهلاً وسهلاً بكم…
          </p>
          <p>
            يسعدنا في الصفوة للسياحة ثقتكم في التعامل معنا، ونقدر لكم اختياركم لنا لتنسيق رحلتكم القادمة.
          </p>
          <p>
            نحن وفريق العمل نحرص دائمًا على تقديم أفضل الخدمات من بداية التواصل وحتى موعد السفر، ونسعى للتخطيط الدقيق لكل تفاصيل رحلتكم عشان تكون تجربتكم معنا سهلة، مريحة، وممتعة بإذن الله.
          </p>
          <p>
            شاكرين لكم ثقتكم اللي نعتبرها وسام على صدورنا.
            <br />
            ومتشوقين نكون جزء من رحلتكم القادمة بإذن الله.
          </p>
          <p className="font-semibold text-foreground pt-2">
            مع خالص الاحترام والتقدير
            <br />
            <span className="text-primary">شركة الصفوة للسياحة</span>
          </p>
        </div>
      </div>
    </div>
  );
};
