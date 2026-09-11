import React, { useMemo, useState } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";

// Anchor ids must match the ones @theme/GlossaryTerm links to, so a tooltip
// click lands on the right entry.
const termId = (term) => term.toLowerCase().replace(/\s+/g, "-");

export default function Glossary() {
  const data = usePluginData("docusaurus-plugin-glossary");
  const terms = useMemo(() => data?.terms ?? [], [data]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return terms;
    const q = query.toLowerCase();
    return terms.filter((t) =>
      [t.term, t.definition, t.abbreviation, ...(t.aliases ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [terms, query]);

  const grouped = useMemo(() => {
    const by = {};
    for (const t of filtered) {
      const letter = t.term.charAt(0).toUpperCase();
      (by[letter] ??= []).push(t);
    }
    for (const letter of Object.keys(by)) {
      by[letter].sort((a, b) => a.term.localeCompare(b.term));
    }
    return by;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="glossary">
      <input
        type="search"
        className="glossary__search"
        placeholder="Search terms..."
        aria-label="Search glossary terms"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {letters.length === 0 ? (
        <p className="glossary__empty">No terms match “{query}”.</p>
      ) : (
        <>
          <nav className="glossary__letters" aria-label="Jump to letter">
            {letters.map((letter) => (
              <a key={letter} href={`#letter-${letter}`}>
                {letter}
              </a>
            ))}
          </nav>

          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="glossary__letter">{letter}</h2>
              <dl className="glossary__list">
                {grouped[letter].map((t) => (
                  <div key={t.term} className="glossary__item" id={termId(t.term)}>
                    <dt className="glossary__term">
                      {t.term}
                      {t.abbreviation && (
                        <span className="glossary__abbr"> ({t.abbreviation})</span>
                      )}
                    </dt>
                    <dd className="glossary__definition">
                      {t.definition}
                      {t.relatedTerms?.length > 0 && (
                        <p className="glossary__related">
                          <strong>Related terms:</strong>{" "}
                          {t.relatedTerms.map((related, i) => (
                            <React.Fragment key={related}>
                              {i > 0 && ", "}
                              <a href={`#${termId(related)}`}>{related}</a>
                            </React.Fragment>
                          ))}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </>
      )}

      <p className="glossary__count">{terms.length} terms.</p>
    </div>
  );
}
