Gopalpur port - raw sources and extraction notes
===============================================

Sources consulted
-----------------

1. Adani Ports — Gopalpur Port (operator landing page)
   - URL: https://www.adaniports.com/Ports-and-Terminals/Gopalpur-Port
   - Accessed: 07 September, 2026

2. Gopalpur Berthing Policy & Tariff Structure (BPTS) — operator PDF (authoritative for berth parameters)
   - URL: https://www.adaniports.com/-/media/Project/Ports/PortsAndTerminals/Gopalpur-Port/Berthing-Policy-and-Tariff-Structure/BPTS-GOPALPUR--Final--020825.pdf
   - Publication / file date: 02 August, 2025
   - Treated as authoritative for berth LOA, permissible draft, displacement limits and operational restrictions.

3. Adani Ports — Gopalpur downloads page
   - URL: https://www.adaniports.com/ports-and-terminals/gopalpur-port/download
   - Accessed: 07 September, 2026

4. Government of Odisha — Directorate of Ports (for cross-checks)
   - URL: https://ct.odisha.gov.in/en/commerce/directorate-ports-inland-water-transport
   - Accessed: 07 September, 2026

5. Government of Odisha — Annual Activities Report 2024-25 (for corroboration)
   - URL: https://ct.odisha.gov.in/sites/default/files/2026-02/Annual%20Activities%20Report%282024-25%29.pdf
   - Accessed: 07 September, 2026

Authoritative source choice
-------------------------

The BPTS (Berthing Policy & Tariff Structure) PDF (02 Aug 2025) published by the port/operator is treated as the authoritative source for berth-level geometry (LOA, permissible draft), displacement limits and operational restrictions. The Adani Ports Gopalpur landing page is used as the port-level operator source and for corroborative statements such as rated handling capacity where explicitly stated.

Port-level values extracted
--------------------------

- `port_id`: GOPALPUR (assigned per dataset convention)
- `port_name`: Gopalpur Port
- `state`: Odisha
- `port_type`: Private Port (operator is Adani Ports; this is not a government-designated "Major Port")
- `annual_capacity_mt`: 20000000 (20,000,000) — included because operator materials state a rated handling capacity of 20 MMTPA (operator communications / site)
- `notes`: documents 3 completed berths and rated capacity; see sources above
- `source_url` / `source_date`: Adani Ports landing page (accessed 07 Sep 2026) used for port-level citation; berth-level specifics cite the BPTS PDF.

Berth-level values extracted (from BPTS PDF)
-------------------------------------------

All three berths and the values below are taken directly from the BPTS-GOPALPUR--Final--020825.pdf unless otherwise noted.

- B-1
  - `max_loa_m`: 300
  - `max_draft_m`: 14.50
  - `berth_length_m`: 300 (document describes LOA/berth length as 300 m)
  - `special_restrictions`: "Displacement limit 145000 MT; berthing/unberthing restrictions; trim/list requirements; wind restrictions above 25 knots"
  - `source_url` / `source_date`: BPTS PDF (02 August, 2025)

- B-2
  - `max_loa_m`: 300
  - `max_draft_m`: 14.50
  - `berth_length_m`: 300
  - `special_restrictions`: "Displacement limit 145000 MT; berthing/unberthing restrictions; trim/list requirements; wind restrictions above 25 knots"
  - `source_url` / `source_date`: BPTS PDF (02 August, 2025)

- B-3
  - `max_loa_m`: 200
  - `max_draft_m`: 14.50
  - `berth_length_m`: 200
  - `special_restrictions`: "Displacement limit 75000 MT; berthing/unberthing restrictions; trim/list requirements; wind restrictions above 25 knots"
  - `source_url` / `source_date`: BPTS PDF (02 August, 2025)

Fields intentionally left blank and why
------------------------------------

- `max_beam_m`: left blank for port and berths — the BPTS PDF does not provide a clear permissible beam limit per berth; do not infer beam from berth width.
- `max_dwt_mt` (ports_master): left blank — displacement numbers are present at berth-level in the BPTS PDF; dataset `max_dwt_mt` represents vessel DWT constraint, which is not explicitly identical to displacement; do not convert displacement to DWT without explicit statement.
- `handling_rate_mt_hr` and `annual_capacity_mt` at berth-level: left blank — the BPTS provides rated port handling capacity but not per-berth handling rates (do not infer).
- `equipment`: left blank at berth-level unless explicitly listed in the BPTS (BPTS does not enumerate berth-specific equipment in machine-readable form); operator landing page lists general terminal infrastructure but not per-berth equipment in a clearly mappable way.

Distinctions and notes
----------------------

- Displacement vs DWT: displacement is the vessel's mass (tonnes) including cargo, fuel, etc.; DWT (deadweight tonnage) measures cargo-carrying capacity only. The BPTS PDF lists displacement limits; those are recorded as operational restrictions and not automatically converted to `max_dwt_mt`.

- Annual capacity vs throughput: the dataset records `annual_capacity_mt` when a source explicitly declares a rated or designed handling capacity. Actual throughput (e.g., tonnes handled in a year) is not the same and should not be used as `annual_capacity_mt` unless the source specifies it as a rated capacity.

Conflicts or ambiguities discovered
----------------------------------

- Some third-party sources suggest shorter LOA (e.g., 240 m) for certain quays; BPTS operator document explicitly lists B-1/B-2 as 300 m and B-3 as 200 m — the BPTS PDF is authoritative and used here.
- Beam and per-berth equipment details are not clearly machine-readable in the BPTS PDF; these fields are left blank to avoid inventing values.

Operational restrictions extracted
--------------------------------

- Displacement limits: 145,000 MT (B-1/B-2), 75,000 MT (B-3)
- Trim/list requirements and berthing/unberthing procedures as described in BPTS
- Wind restriction: berthing/unberthing subject to restrictions when wind > 25 knots

Limitations
-----------

- All values are taken from operator-provided documents and government reports listed above. Where documents are silent (beam, handling rate per berth, per-berth equipment), fields are left blank per dataset rules.

If you want me to extract additional numeric values (e.g., channel depth or equipment counts) from the PDF, I can parse the PDF next and add only values explicitly present in the document.
