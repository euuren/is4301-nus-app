const steps = [
  'Understanding Admission requirements',
  'Submit application online',
  'Upload supporting documents',
  'Make application fee payment',
  'Check application status',
]

function Admission() {
  return (
    <section>
      <h1>Admission</h1>
      <p>Admission process flow:</p>
      <ol className="admission-steps">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  )
}

export default Admission
