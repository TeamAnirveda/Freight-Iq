Sources used:
- VPA Berth particulars page: https://vizagport.com/Template/navigateTemplate/gnt/QmVydGhz (accessed 07 September, 2026)
- VPA periodical drafts PDF (April 2025): https://vpt.shipping.gov.in/admin_assets/uploads/1743668130_periodical_drafts_for_the_month_of_April_2025.pdf (used for tide/restriction cross-checks)
- VPA Berth Details PDF (Berth Details): https://vizagport.com/admin_assets/uploads/1640237145_Berth%20Details.pdf (older infrastructure document; consulted where berth dimensions/equipment were explicit)
- VPA Berthing Facilities layout PDF: https://vizagport.com/admin_assets/uploads/1638236742_berthing_facilities_withlayout.pdf (layout and berth lengths)
- VPA official homepage: https://vizagport.com/ (general port facts; throughput figure)

Source dates and precedence:
- The berth particulars page is the primary and most up-to-date source for berth permissible LOA, permissible draft, cargo types and equipment (used as the authoritative source here).
- The periodical drafts PDF (April 2025) documents temporary/permitted drafts and operational notes; consulted for drafting/tide restrictions where applicable.
- The Berth Details and Berthing Facilities PDFs are older infrastructure documents; they were consulted for auxiliary berth dimensions and equipment when the berth particulars page did not provide explicit values. Where the newer berth particulars page conflicted with the older PDFs, the newer berth particulars were preferred.

What I extracted:
- Port-level summary row for `VISAKHAPATNAM` was added to `data/processed/ports/ports_master.csv`. Numeric port-level capacity/maximums were left blank unless explicitly stated on the official pages.
- Berth-level rows were added to `data/processed/ports/port_berths.csv` for the main Inner Harbour and Outer Harbour berths as listed on the VPA berth particulars page. For grouped berths (e.g., "EQ3 to EQ4", "EQ5 to EQ6", and combined OB1 & OB2 entries), the source treats them as grouped and they were kept grouped here.

Fields intentionally left blank:
- Any numeric field (e.g., `max_loa_m`, `max_beam_m`, `max_draft_m`, `berth_length_m`, `annual_capacity_mt`, `handling_rate_mt_hr`) that was not explicitly provided by the cited official sources was left empty.
- `annual_capacity_mt` was left blank at port level because the site reports throughput (82.62 million tonnes in FY 2024-25) but does not state a rated annual capacity.

Notes and special cases:
- Some berths list multiple capacity numbers or multiple cargo-specific handling rates on the VPA site (e.g., WQ5 lists conveyor loading capacities for alumina and caustic soda). Rather than placing a single value in `handling_rate_mt_hr`, those per-cargo capacities were preserved in the `equipment` field and not condensed into a single `handling_rate_mt_hr` to avoid misrepresentation.
- Where the official source groups multiple berths and provides separate dimensions for each (e.g., OB1 and OB2), those were recorded as a grouped berth with the per-berth dimensions captured verbatim in `special_restrictions` to avoid misassigning values to a single numerical column.
- Where the berth particulars page explicitly stated discharge capacity as tonnes per hour (e.g., OSTT three unloading arms 5500 TPH), that value was recorded in `handling_rate_mt_hr` for that berth.
- Any draft, LOA, beam and equipment values were copied verbatim from the berth particulars page.

Limitations and items for manual review:
- The periodical drafts PDF (April 2025) was listed as a source for draft restrictions; if you need berth-specific temporary draft advisories, please indicate and I can extract exact rows from that PDF into the dataset (it was consulted for cross-checks but not used to override the berth particulars page values unless the berth particulars page referenced it).
- Some older PDFs are present on the VPA site with slightly different dimensions; the berth particulars page was used as authoritative. The README notes where older documents were consulted.

No values were invented or inferred. All populated fields are taken from the cited official sources. If you want me to extract additional fields from the PDFs (for example exact berth lengths from the facilities layout PDF), I can do that next, but I did not overwrite newer berth particulars with older documents.
