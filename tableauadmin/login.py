f = open('admin.txt','r+')
t = []

for line in f.readlines():
    #print(line)
    t.append(line.replace('\n',''))


import tableauserverclient as TSC  


site_id = 'WMCH0223'

tableau_auth = TSC.TableauAuth(t[0], t[1], site_id=site_id)  
server = TSC.Server('https://sundance.marketware.com')  

with server.auth.sign_in(tableau_auth): 
        # get all projects on site
        all_project_items, pagination_item = server.projects.get()
        #print([proj.name for proj in all_project_items])
        #print([proj.id for proj in all_project_items])
        
        for proj in all_project_items:
            #print(proj.id)
            currentAscendId = proj.id
            
print(site_id, currentAscendId)
