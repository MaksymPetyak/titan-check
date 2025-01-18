# Import packes 
from naas_drivers import linkedin
import pandas as pd

# Get cookies
LI_AT = 'AQEDAR4qNXsCr6yqAAABhDNg56AAAAGEn9c70U4AhaQZq44PD4sD7ZHR5plRaGm-BzbvsY8fp4R2fypkuHpaKOiZN_kgJWN_cl8uiC82A09FlSE8ya933w_OQXUn9MOpu2AXnDoLUMLt2N-V6JBmIQcf'  # EXAMPLE AQFAzQN_PLPR4wAAAXc-FCKmgiMit5FLdY1af3-2
JSESSIONID = 'ajax:0659856753056549929'  # EXAMPLE ajax:8379907400220387585

#"""
# Profile URL
PROFILE_URL = "https://www.linkedin.com/in/benjaminwolba/"

# Get data 
df_contact = linkedin.connect(LI_AT, JSESSIONID).profile.get_contact(PROFILE_URL) 
df_identity = linkedin.connect(LI_AT, JSESSIONID).profile.get_identity(PROFILE_URL) 

# Merge data frames
df = pd.concat([df_identity, df_contact], axis="columns")
#"""

df.to_excel("output.xlsx")