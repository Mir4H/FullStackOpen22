const SomeMatches = ({ countries, handleChange }) => (
    <div>
      {countries.map((country) => (
      <p key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={handleChange}>Select</button></p>))}
    </div>
    )

    export default SomeMatches