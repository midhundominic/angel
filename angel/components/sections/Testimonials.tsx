type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

// Add only verified client reviews here. The section stays hidden until real
// testimonial content is supplied.
const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-label="Client testimonials">
      {testimonials.map((testimonial) => (
        <figure key={`${testimonial.name}-${testimonial.quote}`}>
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>{testimonial.name}</figcaption>
        </figure>
      ))}
    </section>
  );
}

