from django.shortcuts import render

# allows render index template
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
