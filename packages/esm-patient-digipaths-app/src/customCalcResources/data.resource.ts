import { restBaseUrl, openmrsFetch, fhirBaseUrl } from '@openmrs/esm-framework';
import useSWR, { type KeyedMutator } from 'swr';

export async function getCondition(patientUuid: string, code: string) {
  const conditionsUrl = `${fhirBaseUrl}/Condition?patient=${patientUuid}&code=${code}&clinical-status=active`;
   
  const response = await openmrsFetch(conditionsUrl);

  const data = await response.json();

  return data;
}
